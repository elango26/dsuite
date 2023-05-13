const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');
const sales = require('../models/sales');
const product = require('../models/product');
const customer = require('../models/customer');
const orders = require('../models/order');
const transactionDetails = require('../models/transactiondetails');
const discountTransaction = require('../models/discounttransaction');
const common = require('./common');
const mongoose = require('mongoose');

function calculateTransactionDetails(rate_type_arr,list){
  var total_amount = 0, transObjArr = [],discountArr = [];
  if(list.details && list.details.length > 0){
    //check for discount and add it in discount transaction
    
    for(let tkey in list.details){
      let details = rate_type_arr.filter(rate_type => rate_type.product.product_id == list.details[tkey].product_id);
      
      if(details.length > 0){
          let product = details[0].product;
          //set to 'Retail' if rate is not avail
          let pt = product['rate_active'][list.details[tkey].rate_type]?product['rate_active'][list.details[tkey].rate_type]:product['rate_active']['Retail'];
          let quantity = list.details[tkey].prod_quan;
          let unit_rate = pt.price;
          let unit_tax = pt.tax;
          let transObj = {
              prod_id: list.details[tkey].prod_id,
              product_id: list.details[tkey].product_id,
              rate_type: list.details[tkey].rate_type,
              type: 'SALES',
              prod_quan: list.details[tkey].prod_quan,
              discount_id: list.details[tkey].discount_id,
              prod_rate_per_unit: unit_rate,                                            
              prod_tax: unit_tax ? (unit_rate * quantity)*unit_tax/100:0,
              sub_amount: unit_rate * quantity
          }
          total_amount += (transObj.prod_tax + transObj.sub_amount);
          list.details[tkey].is_delivered = true;
          transObjArr.push(transObj);
          //pushing existing discount values to dicount table
          if(list.details[tkey].discount_id != '' && list.details[tkey].rate_type == 'Discount'){
            discountArr.push({
              discount_id: transObj.discount_id,
              prod_id: transObj.product_id,
              prod_count: transObj.prod_quan,
              total_amount: transObj.sub_amount
            });
          }
          //checking for new discount match
          if(list.discounts.length > 0 && list.details[tkey].discount_id == null){
            
          }
      }else{
          //remove from details where rate is not avail
          //so commented
          //transObjArr.push(list.details[tkey]);
      }          
    }
  }
  return {
      totalAmount: total_amount,
      newDetails: transObjArr,
      discountArr: discountArr,
      oldDetails: list.details
  }

}

router.post('/placeOrders',(req,res,next)=>{
  let _resp = {
      code : 201,
      message : "Error Occurred",
      data: []
  };
  orders.aggregate([
      {"$addFields":{
          'local_date': { "$dateToString": { format: "%Y-%m-%d", date: "$order_date", timezone: "+05:30" } }
      }},
      {"$match":{
          local_date: req.body.orderdate
      }},
      {"$lookup":{
          from: 'transactiondetails',
          as: 'details',
          let: { parent_id: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$parent_id', '$$parent_id'] },
                    { $eq: ['$is_active','YES']},
                    { $eq: ['$is_delete','NO']}
                  ]
                }
              }
            }
          ]
      }},
      {"$lookup":{
          from: 'discounts',
          as: 'discounts',
          let : {'l_date': '$order_date'},
          pipeline : [{
            $match:{
              $expr: {
              $and:[
                {$lte:['$from_date','$$l_date']},
                {$gte:['$to_date','$$l_date']}
                ]
              }
            }
          }]
      }}
  ]).exec((err,list)=>{
    //fetch all rate details
    //write a function to fetch rates and make it as async
    let resp = common.getRateList();
    resp.then(function(result) {
      const rate_type_arr = result;
      if(!err){
        let updateOrderObj=[],updateTransObj=[],newTransObj=[];
        let err_str = "";
        if(list.length > 0){
          var order_size = list.length;
          for(let key=0;key<list.length;key++){
            console.log('loop'+key);
            //start getting count here
            // sales.countDocuments(function(err, count) {
            common.getCount().then(function(count){            
              //   if(!err){
                //write in main sales and its corresponding transaction table                        
                let transDetails = calculateTransactionDetails(rate_type_arr,list[key]);
            
                let saleData = {
                  sale_id: count,
                  customer_id: list[key].customer_id,
                  sale_date: list[key].order_date,
                  total_amount: transDetails.totalAmount,
                  created_by: list[key].createdBy
                }
                console.log(saleData);
                list[key]['newDetails'] = transDetails.details;
                let newSales = new sales(saleData);
                newSales.save((err,sales)=>{
                  if(!err){
                    if(list[key] && list[key].details.length > 0){
                      console.log('save loop'+key);
                      //let transaction_size = list[key].details.length; 
                      var j = 0;
                      for(let tkey in list[key].details){  
                        console.log('inner most '+j)                                    
                        if(list[key].newDetails && list[key].newDetails[tkey]){
                            list[key].newDetails[tkey]['parent_id'] = sales._id;
                        }
                        //update trasaction table
                        updateTransObj.push({
                          updateOne: {
                            filter: { _id:ObjectId(list[key].details[tkey]._id),type:'ORDER' },
                            update: { $set: { is_delivered: true }}
                          }
                        });
                        j++;
                      }
                      //new sale
                      newTransObj.push(list[key].newDetails);                                  
                    } 

                    //update order table                              
                    updateOrderObj.push({
                        updateOne: {
                            filter: { _id:ObjectId(list[key]._id) },
                            update: { $set: { is_delivered: "YES" }}
                        }
                    });

                    if(key == order_size - 1){
                      try{
                        //new sale
                        if(newTransObj.length > 0)
                          transactionDetails.insertMany(newTransObj);                                       
                        //update transaction orders
                        if(updateTransObj.length > 0)
                          transactionDetails.bulkWrite(updateTransObj);
                        //update order
                        if(updateOrderObj.length > 0)
                          orders.bulkWrite(updateOrderObj); 
                        
                        _resp.code = 200;
                        _resp.message = "Invoice generated successfully";
                        if(err_str != "")
                          _resp.data = err_str;
                        res.json(_resp);

                      }catch(e){
                        console.log('error in saving all details');
                        _resp.message = "Error in saving all details";
                        res.json(_resp);
                      }
                    }
                  } else {
                    console.log("error in saving order");
                    console.log(err);
                    err_str += err;

                    //if all goes on err
                    if(key == order_size - 1){
                      _resp.message = "error in saving order";
                      _resp.data = err_str;
                      res.json(_resp);
                    }
                  }
                });
              // } else { // count err els statement
              //   _resp.message = "Error in getting count doc";
              //   res.json(_resp);
              // }
            });
          }  
        }else{
          _resp.code = 200;
          _resp.message = "No orders found";
          res.json(_resp);
        }
      }else{
        console.log("its error"+err);
        _resp.message = "Error in fetch order list";
        res.json(_resp);
      }
    }, function(err){
        console.log("its error"+err);
        _resp.message = "Error in get rate list";
        res.json(_resp);
    });
  });
});

router.get('/invoices',(req,res,next)=>{
    sales.aggregate([
        {"$addFields":{
            localDate: {$dateToString:{format:"%Y-%m-%d",date:'$sale_date',timezone:'+05:30'}}
        }},
        {"$match":{
            sale_id:'POS0000009'
        }},
        {"$lookup":{
            from: 'transactiondetails',
            as: 'details',
            let: { parent_id: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$parent_id', '$$parent_id'] },
                      { $eq: ['$type','SALES']},
                      { $eq: ['$is_active', 'YES']},
                      { $eq: ['$is_delete', 'NO']}
                    ]
                  }
                }
              }
            ]
        }},
        {"$unwind":{
            path: '$details',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
        }},
        {"$lookup":{
            from: 'products',
            localField: 'details.prod_id',
            foreignField: '_id',
            as: 'details.product'
        }},
        {"$unwind":{
            path: '$details.product',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
        }},
        {"$group":{
            _id: '$_id',
            'details': {
              $push : '$details'
            }
        }},
        {"$lookup":{
            from: 'sales',
            localField: '_id',
            foreignField: '_id',
            as: 'sales'
        }},
        {"$unwind":{
            path: '$sales',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
        }},
        {"$lookup":{
          from: 'discounttransactions',
          localField: 'sales.sale_id',
          foreignField: 'sale_id',
          as: 'sales.discount'
        }},
        {"$lookup":{
            from: 'customers',
            localField: 'sales.customer_id',
            foreignField: '_id',
            as: 'sales.customer'
        }},
        {"$unwind":{
            path: '$sales.customer',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
        }}
    ]).exec((err,list)=>{
        if(!err){
            let resp = {
                code : 200,
                message : "Invoice loaded!!",
                data: list
            }
            res.json(resp);
        }
    });
});

// var stream = Model
// .aggregate(pipeline)
// .cursor({ batchSize: 1000 })
// .exec().stream();

// stream.on('data', function(doc) {
//   // ...
// });

router.get('/promise',(req,res,next)=>{
  for(var i=0;i<=3;i++){
    new Promise((resolve,reject)=>{
      sales.countDocuments(function(err,count){
        if(!err){
            console.log(count);
            resolve(common.padding(count+1,7,'POS'));
        }else{
            reject(err);
        }
      });
    })
    console.log(i);
  }
  console.log('done');
  res.json('done!!');
});

router.post('/placeOrder',(req,res,next)=>{
  let _resp = {
      code : 201,
      message : "Error Occurred",
      data: []
  };
  orders.aggregate([
      {"$addFields":{
          'local_date': { "$dateToString": { format: "%Y-%m-%d", date: "$order_date", timezone: "+05:30" } }
      }},
      {"$match":{
          local_date: req.body.orderdate
      }},
      {"$lookup":{
          from: 'transactiondetails',
          as: 'details',
          let: { parent_id: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$parent_id', '$$parent_id'] },
                    { $eq: ['$is_active','YES']},
                    { $eq: ['$is_delete','NO']}
                  ]
                }
              }
            }
          ]
      }},
      {"$lookup":{
          from: 'discounts',
          as: 'discounts',
          let : {'l_date': '$order_date'},
          pipeline : [{
            $match:{
              $expr: {
              $and:[
                {$lte:['$from_date','$$l_date']},
                {$gte:['$to_date','$$l_date']}
                ]
              }
            }
          }]
      }}
  ]).exec((err,list)=>{
    //fetch all rate details
    //write a function to fetch rates and make it as async
    if(!err){
      if(list.length > 0){
        let resp = common.getRateList();
        resp.then(async function(result) {
          const rate_type_arr = result;
          let updateOrderObj=[],updateTransObj=[],newTransObj=[],newDiscountObj=[];
          var order_size = list.length;
          for(let key=0;key<list.length;key++){
            let transDetails = calculateTransactionDetails(rate_type_arr,list[key]);
            let saleData = {
              sale_id: 'POS'+list[key].order_id,
              customer_id: list[key].customer_id,
              sale_date: list[key].order_date,
              total_amount: transDetails.totalAmount,
              created_by: list[key].createdBy
            }
            list[key]['newDetails'] = transDetails.newDetails;
            list[key]['discounts'] = transDetails.discountArr;
            let newSales = new sales(saleData);
            await new Promise((resolve,reject) => {
              //new save with promise
              newSales.save((err,sales)=>{
                if(!err){
                  resolve(sales);
                } else {
                  reject(err);
                }
              });
            }).then((new_sales) => {
              console.log(new_sales);
              if(list[key] && list[key].details.length > 0){
                console.log('save loop'+key);
                //let transaction_size = list[key].details.length; 
                var j = 0;
                for(let tkey in list[key].details){                                  
                  if(list[key].newDetails && list[key].newDetails[tkey]){
                      list[key].newDetails[tkey]['parent_id'] = new_sales._id;
                  }
                  //update trasaction table
                  console.log('takey'+tkey);
                  if(list[key].details[tkey].is_delivered == true){
                    updateTransObj.push({
                      updateOne: {
                        filter: { _id:ObjectId(list[key].details[tkey]._id),type:'ORDER' },
                        update: { $set: { is_delivered: true }}
                      }
                    });
                  }
                  j++;
                }
                //new sale
                if(list[key].newDetails.length > 0)
                  newTransObj.push(list[key].newDetails);   
                
                //discounts
                if(list[key].discounts.length > 0)
                  newDiscountObj.push(list[key].discounts);
              }

              //update order table                              
              updateOrderObj.push({
                updateOne: {
                    filter: { _id:ObjectId(list[key]._id) },
                    update: { $set: { is_delivered: "YES" }}
                }
              });
              if(key == order_size - 1){
                // console.log(updateTransObj);
                // console.log(newTransObj);
                // console.log(updateOrderObj);
                // console.log(newDiscountObj);
                if(newDiscountObj.length > 0)
                  discountTransaction.insertMany(newDiscountObj);  
                if(newTransObj.length > 0)
                  transactionDetails.insertMany(newTransObj);                                       
                //update transaction orders
                if(updateTransObj.length > 0)
                  transactionDetails.bulkWrite(updateTransObj);
                //update order
                if(updateOrderObj.length > 0)
                  orders.bulkWrite(updateOrderObj); 
                _resp.code = 200;
                _resp.message = "success";
                res.json(_resp);
              }
            });
          }
        }, function(err){
          console.log("its error"+err);
          _resp.message = "Error in get rate list";
          _resp.data = err;
          res.json(_resp);
        });
      } else {
        _resp.code = 200;
        _resp.message = "No orders found!!";
        res.json(_resp);
      }
    } else {
      console.log("its error"+err);
      _resp.message = "Error in aggregation";
      _resp.data = err;
      res.json(_resp);
    }
  });
});


router.get('/productList',(req,res,next)=>{
  product.aggregate([
    {"$match":{
      'alias':'500'
    }}
  ],
  { cursor: { batchSize: 0 } })//.cursor({ batchSize: 0, async: true })
  .exec(function(error, cursor) { 
    console.log('done 1');
    if(error){
      console.log('done 2');
      res.json(error);

    }else{
      console.log('done 3');
      while(cursor.hasNext()){
        console.log(cursor.next());
      }
      console.log('done 4');
      res.json('sent');
    }
  });
  // product.aggregate([
  //   {"$group":{
  //     _id: {brand:'$brand_name',category:'$category',sub_category:'$sub_category'},
  //     products: {
  //       $push: '$$ROOT'
  //     },
  //     count:{
  //       $sum: 1
  //     }
  //   }}
  // ],{
  //   cursor: {}
  // }).exec((err,ycursor)=>{
  //   if(err){
  //     res.json(err);
  //   }else{
  //     while(ycursor.hasNext()){
  //       console.log(ycursor.next());
  //     }
  //     res.json('success');
  //   }
  // });  
});

router.get('/list',(req,res,next)=>{
    var arr = [];
    let dat1 = new Date();
    dat1.setDate(dat1.getDate() - 8);
    arr.push(dat1);
    let dat2 = new Date();
    dat2.setDate(dat2.getDate() - 1);
    arr.push(dat2);
    let dat3 = new Date();
    arr.push(dat3);
    console.log(arr);
    customer.aggregate([
        {"$lookup":{
          from: 'sales',
          localField: '_id',
          foreignField: 'customer_id',
          as: 'sales'
        }},
        {"$unwind":{
          path: '$sales',
          //includeArrayIndex: '<<string>>',
          preserveNullAndEmptyArrays: true
        }},
        { "$group": {
          "_id": {
            "customer": "$sales.customer_id",
            "dte": {
              "$let": {
                "vars": { 
                  "dte": "$sales.sale_date"
                },
                "in": {
                  "$switch": {
                    "branches": [
                      { "case": { "$lte": [ "$$dte", dat1 ] }, "then": "old" },
                      { "case": { "$lte": [ "$$dte", dat2 ] }, "then": "week" },
                      { "case": { "$lte": [ "$$dte", dat3 ] }, "then": "today" },
                    ]
                  }
                }
              }
            }
          },
          "sales": {
            "$sum": "$sales.total_amount"
          },
          "count": { "$sum": 1 }
        }}     
    ]).exec((err,result) => {
        if(!err){
          customer.aggregate([              
            {"$lookup":{
              from: 'payments',
              localField: '_id',
              foreignField: 'customer_id',
              as: 'payments'
            }},           
            {"$unwind":{
              path: '$payments',
              //includeArrayIndex: '<<string>>',
              preserveNullAndEmptyArrays: true
            }},
            { "$group": {
              "_id": {
                "customer": "$payments.customer_id",
                "dte": {
                  "$let": {
                    "vars": { 
                      "dte": "$payments.createdAt"
                    },
                    "in": {
                      "$switch": {
                        "branches": [
                          { "case": { "$lte": [ "$$dte", dat1 ] }, "then": "old" },
                          { "case": { "$lte": [ "$$dte", dat2 ] }, "then": "week" },
                          { "case": { "$lte": [ "$$dte", dat3 ] }, "then": "today" },
                        ]
                      }
                    }
                  }
                }
              },
              "paid": {
                "$sum": "$payments.amount"
              },
              "count": { "$sum": 1 }
            }}
          ]).exec((err,payments) => {
            if(!err){
              var sales_arr = {};          
              if(result.length > 0){
                for(let i=0;i<result.length;i++){
                  if(!sales_arr[result[i]._id.customer])
                    sales_arr[result[i]._id.customer] = [];
                  //console.log(sales_arr);
                  let temp = {
                    'dte': result[i]._id.dte,
                    'sales': result[i].sales,
                    'count': result[i].count
                  }
                  sales_arr[result[i]._id.customer].push(temp);
                  //console.log(sales_arr);
                }
              }

              var paid_arr = {}; 
              if(payments.length > 0){
                for(let i=0;i<payments.length;i++){
                  if(!paid_arr[payments[i]._id.customer])
                    paid_arr[payments[i]._id.customer] = [];
                  
                  let temp = {
                    'dte': payments[i]._id.dte,
                    'paid': payments[i].paid,
                    'count': payments[i].count
                  }
                  paid_arr[payments[i]._id.customer].push(temp);
                  //console.log(sales_arr);
                }                
              }
              let response = {
                'sales': sales_arr,
                'payments': paid_arr
              }
              res.json(response);
            }else{
              res.json(err);
            }
          });
        }else{
          res.json(err);
        }
    })
});

router.get('/getDate',(req,res,next)=>{
  // const date = req.query.date;
  // res.json(common.getFinancialYear(date));
  const modelNames = mongoose.modelNames();
  res.json(modelNames);
})
module.exports = router;