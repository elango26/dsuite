const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');
const orders = require('../models/order');
const transactionDetails = require('../models/transactiondetails');
const discountTransaction = require('../models/discounttransaction');
const sales = require('../models/sales');
const common = require('./common');

router.get('/searchOrders',(req,res,next)=>{
    orders.aggregate([
        {
            $project:{
                is_delivered: '$is_delivered',
                customer_id: '$customer_id',
                yearMonthDayUTC: { "$dateToString": { format: "%Y-%m-%d", date: "$order_date", timezone: "+05:30" } }
            }
        },
        {
            $lookup:{
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
            }
        },
        {
            $match:{
                yearMonthDayUTC: req.query.searchDate,
                customer_id:ObjectId(req.query.id),
                is_delivered: req.query.delivered
            }
        }
    ]).exec((err,list) => {
        //'2019-09-03'
        if(!err){
            res.json(list);
        }else{
            res.json("err"+err);
        }
    });    
});

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
                tax: unit_tax,                                      
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
            is_delivered: 'NO',
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
            //console.log(list); res.json(list);
          let resp = common.getRateList();
          resp.then(async function(result) {
            const rate_type_arr = result;
            let updateOrderObj=[],updateTransObj=[],newTransObj=[],newDiscountObj=[];
            var order_size = list.length;
            for(let key=0;key<list.length;key++){
              let transDetails = calculateTransactionDetails(rate_type_arr,list[key]);
              console.log(list[key].order_id);
              let saleData = {
                sale_id: 'POS'+list[key].order_id,
                customer_id: list[key].customer_id,
                sale_date: list[key].order_date,
                total_amount: transDetails.totalAmount,
                payment_type: 'CREDIT',
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
                  if(list[key].newDetails.length > 0){
                    newTransObj = newTransObj.concat(list[key].newDetails);
                  }                       
                  
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
                  console.log(updateTransObj);
                  console.log(newTransObj);
                  console.log(updateOrderObj);
                  console.log(newDiscountObj);
                  if(newDiscountObj.length > 0)
                    discountTransaction.insertMany(newDiscountObj);  
                  try{
                    if(newTransObj.length > 0){
                        console.log('inside many');
                        transactionDetails.insertMany(newTransObj); 
                    }
                  }catch(e){
                      console.log('err'+e);
                  }
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

router.get('/list',(req,res,next)=>{
    
    orders.aggregate([
        {    
        "$lookup": {
            "from": "users",
            "localField": "createdBy",
            "foreignField": "_id",
            "as": "createdUser"
        }},
        {    
        "$lookup": {
            "from": "users",
            "localField": "updatedBy",
            "foreignField": "_id",
            "as": "updatedUser"
        }},
        {    
        "$lookup": {
            "from": "customers",
            "localField": "customer_id",
            "foreignField": "_id",
            "as": "customerDetail"
        }}
    ]).exec((err,list)=>{
        if(err){
            res.json(err);
        }else{
            let result = [];
            if(list && list.length){
                let processedCount = 0;
                for (let i = 0, len = list.length; i < len; i++) {

                    transactionDetails.aggregate([
                        {
                            "$match": { parent_id: ObjectId(list[i]._id), is_delete:'NO', is_active:'YES' }
                        },
                        {    
                        "$lookup": {
                            "from": "products",
                            "localField": "prod_id",
                            "foreignField": "_id",
                            "as": "product"
                        }},
                        {    
                        "$lookup": {
                            "from": "discounts",
                            "localField": "prod_discount_id",
                            "foreignField": "_id",
                            "as": "discount"
                        }}
                    ]).exec((err,detail)=>{                        
                        if(!err) list[i].details = detail;
                        result.push(list[i]);
                        processedCount++;
                        if(processedCount === len){
                            res.json(result);
                        } 
                    }); 
                }
            }
        }
    });
});
    
router.post('/create',(req,res,next)=>{
    orders.countDocuments(function(err, count) {
        if(!err){     
    
            if(req.body.createdBy) req.body.createdBy = {_id: ObjectId(req.body.createdBy)}
            if(!req.body._id) req.body['order_id'] = common.padding(count+1,7,'SO');

            let newOrders = new orders(req.body);
            if(req.body._id)
                newOrders.isNew = false;
            //     req.body._id = ObjectId(req.body._id);
            

            newOrders.save((err,orders)=>{
                if(err){
                    res.json(err);
                }else{
                    if(!req.body.details || !req.body.details.length) res.json({msg:'Please enter orders'});
                    //let count = 0;
                    //removing all trasaction details 
                    if(req.body._id){
                        const query = { parent_id : ObjectId(req.body._id) };

                        transactionDetails.deleteMany(query)
                        .then(result => console.log(`Deleted ${result.deletedCount} item(s).`))
                        .catch(err => console.error(`Delete failed with error: ${err}`));
                    }                
                    //inserting new transactions
                    let newTransObj = [];
                    for (let i = 0, len = req.body.details.length; i < len; i++) {
                        req.body.details[i].parent_id = orders._id;
                        req.body.details[i].type = "ORDER";
                        newTransObj.push(req.body.details[i]);
                        // let newtransaction = new transactionDetails(req.body.details[i]);
                        // newtransaction.save((errs,transaction)=>{
                        //     if(errs){
                        //         res.json(errs); 
                        //     }
                        //     count++
                        //     if(count === len) res.json({msg:'Orders added successfully'});
                        // });
                    }
                    transactionDetails.insertMany(newTransObj).then(result => {
                        res.json({msg:'Orders added successfully'});
                    }).catch(err => {
                        res.json(err);
                    });
                }
            });
        }else{
            res.json({msg:'Error in count:: Order'});
        }
    });
});

router.put('/update/:id',(req,res,next)=>{

    orders.findByIdAndUpdate(req.params.id, {$set: req.body},(err,orders)=>{
        if(err){
            res.json(err);
        }else{
            transactionDetails.deleteMany({ parent_id : orders._id });
            if(!req.body.details || !req.body.details.length) res.json({msg:'Orders updated successfully'});
            let count = 0;
            for (let i = 0, len = req.body.details.length; i < len; i++) {
                req.body.details[i].parent_id = orders._id;
                req.body.details[i].type = "ORDER";
                let newtransaction = new transactionDetails(req.body.details[i]);
                newtransaction.save((errs,transaction)=>{
                    if(errs){
                        res.json(errs);
                    }
                    count++
                    if(count === len) res.json({msg:'Order updated successfully'});
                });
            }
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    
    orders.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            transactionDetails.deleteMany({ parent_id : req.params.id });
            res.json(result);
        }
    });
});



module.exports = router;