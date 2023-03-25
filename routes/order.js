const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');
const orders = require('../models/order');
const transactionDetails = require('../models/transactiondetails');
const discountTransaction = require('../models/discounttransaction');
const sales = require('../models/sales');
const common = require('./common');
const discount = require('../models/discount');

router.get('/test',(req,res,next) => {
  //common.getDiscounts(req,res);
  //res.json(common.getDiscounts(req));
  let reqt;
  let resp = common.getRateList(reqt);
  resp.then(async function(result) {
    res.json(result);
  });
});

router.get('/searchOrders',(req,res,next)=>{
  const fYear = common.getFinancialYear(req.query.searchDate);
    orders.aggregate([
        {"$match":{
          "is_delete":"NO",
          "is_active":"YES",
          "financial_year": fYear,
        }},
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

function calculateTransactionDetails(rate_type_arr,discount_available,list){
  //console.log(list);
    var total_amount = 0, transObjArr = [],discountArr = [];
    if(list.details && list.details.length > 0){      
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
            // console.log(discount_available);
            // console.log(list.details[tkey].prod_id.toString());
            // console.log(discount_available.filter(d => d.buy_prod_id.toString() == list.details[tkey].prod_id.toString()));
            // console.log(discount_available.filter(d => d.applicable_customer.indexOf(list.customer.customer_id) > -1));
            // console.log(discount_available.filter(d => d.applicable_type.indexOf(list.details[tkey].rate_type ) > -1));
            // console.log(discount_available.filter(d => d.buy_count > quantity));
            if(discount_available.length > 0){
              //discount code
              let discounts = discount_available.filter(function(d){ return d.buy_prod_id.toString() == list.details[tkey].prod_id.toString() && d.applicable_customer.indexOf(list.customer.customer_id) > -1 && d.applicable_type.indexOf(list.details[tkey].rate_type ) > -1 && quantity > d.buy_count});
              console.log(discounts);
              if(discounts.length > 0 ){
                console.log(discounts[0].buy_prod_id.toString());
                console.log(discounts[0].free_prod_id.toString());
                //check for free product id and free count
                if(discounts[0].buy_prod_id.toString() == discounts[0].free_prod_id.toString()){ //only if buy and free prods are same
                  console.log("2");
                  let calc_quan = Math.floor(quantity / discounts[0].buy_count);
                  let free_count = calc_quan * discounts[0].free_count;
                  discountArr.push({
                    discount_id: discounts[0]._id,
                    //prod_id: discounts[0].free_prod_id,
                    prod_id: discounts[0].free_product[0].product_id,
                    prod_count: free_count,
                    total_amount: free_count * unit_rate,
                    sale_id:'POS'+list.order_id
                  });
                } else {
                  // add additional transaction and discount transaction if diff product
                  // ..to do here
                }
              }
            }

            //pushing existing discount values to dicount table
            // if(list.details[tkey].discount_id != '' && list.details[tkey].rate_type == 'Discount'){
            //   discountArr.push({
            //     discount_id: transObj.discount_id,
            //     prod_id: transObj.product_id,
            //     prod_count: transObj.prod_quan,
            //     total_amount: transObj.sub_amount
            //   });
            // }
            //checking for new discount match
            // if(list.discounts.length > 0 && list.details[tkey].discount_id == null){
              
            // }
        }else{
            //remove from details where rate is not avail
            //so commented
            //transObjArr.push(list.details[tkey]);
        }          
      }
    }
    // round off calculation
    let round_off_val = 0,round_off_sym='+';
    console.log(discountArr);
    total_amount -= discountArr.length > 0 ? discountArr.map(d=>d.total_amount).reduce((acc,value) => acc + value,0):0;
    if(total_amount > 0){
      let roundoff = total_amount % 1;
      if(roundoff >= 0.5){       
        round_off_val=(1-roundoff);
        round_off_sym='+';
      }else{
        round_off_val=-roundoff;
        round_off_sym='';   
      }
    }
    return {
        roundOff: {val:round_off_val,sym:round_off_sym},
        totalAmount: total_amount+round_off_val,
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
            is_active: 'YES',
            is_delete: 'NO',
            is_delivered: 'NO',
            local_date: req.body.orderdate
        }},
        {"$lookup":{
          from: 'customers',
          localField: 'customer_id',
          foreignField: '_id',
          as: 'customer'          
        }},
        {"$unwind":{
          path: '$customer',
          //includeArrayIndex: 'string',
          preserveNullAndEmptyArrays: true
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
        // {"$lookup":{
        //     from: 'discounts',
        //     as: 'discounts',
        //     let : {'l_date': '$order_date'},
        //     pipeline : [{
        //       $match:{
        //         $expr: {
        //         $and:[
        //           {$lte:['$from_date','$$l_date']},
        //           {$gte:['$to_date','$$l_date']}
        //           ]
        //         }
        //       }
        //     }]
        // }}
    ]).exec((err,list)=>{
      //fetch all rate details
      //write a function to fetch rates and make it as async
      if(!err){
        if(list.length > 0){
            //console.log(list); res.json(list);
          var reqt = {};
          reqt['query'] = {
            isactive:"YES",
            cur_date: req.body.orderdate
          }; //parameter to passed if needed
          let resp = common.getRateDiscountList(reqt);
          resp.then(async function(result) {
            const discount_available = result[0]; // discounts available now
            const rate_type_arr = result[1]; //rate type
            let updateOrderObj=[],updateTransObj=[],newTransObj=[],newDiscountObj=[];
            var order_size = list.length;
            for(let key=0;key<list.length;key++){
              let transDetails = calculateTransactionDetails(rate_type_arr,discount_available,list[key]);
              //console.log(list[key].order_id);
              let saleData = {
                sale_id: 'POS'+list[key].order_id,
                customer_id: list[key].customer_id,
                sale_date: list[key].order_date,
                total_amount: transDetails.totalAmount,
                roundOff:transDetails.roundOff,
                payment_type: 'CREDIT',
                created_by: list[key].createdBy
              }
              list[key]['newDetails'] = transDetails.newDetails;
              list[key]['discounts'] = transDetails.discountArr;
              // res.json(list);
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
                // console.log(new_sales);
                if(list[key] && list[key].details.length > 0){
                  // console.log('save loop'+key);
                  //let transaction_size = list[key].details.length; 
                  var j = 0;
                  for(let tkey in list[key].details){
                    if(list[key].newDetails && list[key].newDetails[tkey]){
                        list[key].newDetails[tkey]['parent_id'] = new_sales._id;
                        list[key].newDetails[tkey]['parent_date'] = new_sales.sale_date;
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
                    //updateTransObj.push({ insertOne : list[key].newDetails});
                    newTransObj = newTransObj.concat(list[key].newDetails);
                  }                       
                  
                  //discounts
                  if(list[key].discounts.length > 0){
                    console.log("count coming");
                    //list[key].discounts['sale_id']=new_sales.sale_id;
                    newDiscountObj = newDiscountObj.concat(list[key].discounts);
                  }
                }
  
                //update order table                              
                updateOrderObj.push({
                  updateOne: {
                      filter: { _id:ObjectId(list[key]._id) },
                      update: { $set: { is_delivered: "YES" }}
                  }
                });
                if(key == order_size - 1){
                  var err = "";
                  var promises = [];
                  // console.log(updateTransObj);
                  // console.log(newTransObj);
                  // console.log(updateOrderObj);
                  // console.log(newDiscountObj);
                  //try{
                    if(newDiscountObj.length > 0){
                      console.log("obj count");
                      promises.push(new Promise((resolve,reject)=>{
                        discountTransaction.insertMany(newDiscountObj,{ordered:false}).then(sucess=>{
                          resolve(sucess);
                        }).catch(error=>{
                          reject(error);
                        });
                      }));                       
                    }
                  //}catch(e){
                    //err += "::disTrans::"+e;
                  //}                  
                  //try{
                    if(newTransObj.length > 0){
                      //console.log('inside many');
                      //transactionDetails.insertMany(newTransObj,{ordered:false}); 
                      promises.push(new Promise((resolve,reject)=>{
                        transactionDetails.insertMany(newTransObj,{ordered:false}).then(sucess=>{
                          resolve(sucess);
                        }).catch(error=>{
                          reject(error);
                        });
                      })); 
                    }
                  //}catch(e){
                    //err += "::newTrans::"+e;
                  //}
                  //update transaction orders
                  //try{
                    if(updateTransObj.length > 0){
                      promises.push(new Promise((resolve,reject)=>{
                        transactionDetails.bulkWrite(updateTransObj,{ordered:false}).then(sucess=>{
                          resolve(sucess);
                        }).catch(error=>{
                          reject(error);
                        });
                      }));
                    }
                    //transactionDetails.bulkWrite(updateTransObj,{ordered:false});
                  //}catch(e){
                    //err += "::transDet::"+e;
                  //}                  
                  //update order
                  //try{
                    if(updateOrderObj.length > 0){
                      promises.push(new Promise((resolve,reject)=>{
                        orders.bulkWrite(updateOrderObj,{ordered:false}).then(sucess=>{
                          resolve(sucess);
                        }).catch(error=>{
                          reject(error);
                        });
                      }));
                    }
                    //orders.bulkWrite(updateOrderObj,{ordered:false}); 
                  // }catch(e){
                  //   err += "::updOrder::"+e;
                  // }  

                  // console.log(err);
                  // if(err !="")
                  //   _resp.data = err;
                  Promise.all(promises).then(responses => {
                    _resp.code = 200;
                    _resp.data = responses;
                    _resp.message = "success";
                    res.json(_resp);
                  }).catch(error => {
                    _resp.code = 201;
                    _resp.data = error;
                    _resp.message = "failed";
                    res.json(_resp);
                  });                 
                }
              }).catch((err)=>{
                // console.log(err.message);
                _resp.code = 201;
                _resp.data = err.message;
                _resp.message = "Error occurred!!";
                res.json(_resp);
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
  let _resp = {
    code : 201,
    message : "Error Occurred",
    data: []
  };
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
                  let resultantObj = {};
                    //if(!req.body.details || !req.body.details.length) res.json({msg:'Please enter orders'});
                    //let count = 0;                                   
                    //inserting new transactions
                  let newTransObj = [];
                  if(req.body.details && req.body.details.length > 0){
                    for (let i = 0, len = req.body.details.length; i < len; i++) {
                      req.body.details[i].parent_id = orders._id;
                      req.body.details[i].parent_date = orders.order_date;
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
                  }
                  //removing all trasaction details 
                  if(req.body._id){
                    const query = { parent_id : ObjectId(req.body._id) };
                    transactionDetails.deleteMany(query).then(result => {
                        console.log(`Deleted ${result.deletedCount} item(s).`);
                        if(newTransObj.length > 0){
                          transactionDetails.insertMany(newTransObj).then(result => {
                            resultantObj = {
                              'orders':orders,
                              'details': result
                            }
                            _resp.code = 200;
                            _resp.message = "Orders added successfully";
                            _resp.data = resultantObj;
                            res.json(_resp);
                          }).catch(err => {
                            _resp.message = "Failure";
                            _resp.data = err;
                            res.json(_resp);
                          });
                        } else {
                          _resp.code = 200;
                          _resp.message = "Orders deleted successfully!!";
                          _resp.data = {};
                          res.json(_resp);
                        }
                    }).catch(err => console.error(`Delete failed with error: ${err}`));
                  } else {
                    transactionDetails.insertMany(newTransObj).then(result => {
                      resultantObj = {
                        'orders':orders,
                        'details': result
                      }
                      _resp.code = 200;
                      _resp.message = "Orders added successfully";
                      _resp.data = resultantObj;
                      res.json(_resp);
                    }).catch(err => {
                      _resp.message = "Failure";
                      _resp.data = err;
                      res.json(_resp);
                    });
                  }                    
                }
            });
        }else{
          _resp.message = "Failure";
          _resp.data = err;
          res.json(_resp);
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
                req.body.details[i].parent_date = orders.order_date;
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