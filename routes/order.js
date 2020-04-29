const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');
const orders = require('../models/order');
const transactionDetails = require('../models/transactiondetails');
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
    var total_amount = 0, transObjArr = [];
    if(list.details && list.details.length > 0){        
        for(let tkey in list.details){

            let details = rate_type_arr.filter(function(rate_type){return rate_type.product.product_id == list.details[tkey].product_id})    
            
            if(details.length > 0){
                let product = details[0].product;
                
                let quantity = list.details[tkey].prod_quan;
                let unit_rate = product['rate_active'][list.details[tkey].rate_type].price;
                let unit_tax = product['rate_active'][list.details[tkey].rate_type].tax;
                let transObj = {
                    prod_id: list.details[tkey].prod_id,
                    product_id: list.details[tkey].product_id,
                    rate_type: list.details[tkey].rate_type,
                    type: 'SALES',
                    prod_quan: list.details[tkey].prod_quan,
                    prod_rate_per_unit: unit_rate,                                            
                    prod_tax: unit_tax ? (unit_rate * quantity)*unit_tax/100:0,
                    sub_amount: unit_rate * quantity
                }
                total_amount += (transObj.prod_tax + transObj.sub_amount);
                transObjArr.push(transObj);
            }else{
                transObjArr.push(list.details[tkey]);
            }
            
        }
    }
    return {
        totalAmount: total_amount,
        details: transObjArr
    }

}

router.post('/placeOrders',(req,res,next)=>{
    
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
        }}
    ]).exec((err,list)=>{
        //fetch all rate details
        //write a function to fetch rates and make it as async
        let resp = common.getRateList();
        resp.then(function(result) {
            const rate_type_arr = result;
            if(!err){
                let updateOrderObj=[], updateTransObj=[];
                var trans_loop = false, order_loop = false;
                if(list.length > 0){
                    var order_size = list.length;
                    var i = 0;
                    for(let key in list){
    
                        //write in main sales and its corresponding transaction table
                        
                        let transDetails = calculateTransactionDetails(rate_type_arr,list[key]);
                        
                        let saleData = {
                            customer_id: list[key].customer_id,
                            sale_date: list[key].order_date,
                            total_amount: transDetails.totalAmount,
                            created_by: list[key].createdBy
                        }
                        list[key]['newDetails'] = transDetails.details;
                        let newSales = new sales(saleData);
                        newSales.save((err,sales)=>{
                            if(err){
                                res.json(err);
                            }else{
                                if(list[key] && list[key].details.length > 0){
                                    let transaction_size = list[key].details.length; 
                                    var j = 0;
                                    for(let tkey in list[key].details){
                                        
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
                                        j+=1;
                                        if(j == transaction_size)
                                            trans_loop = true;
                                    }

                                    
            
                                    try{
                                        //new sale
                                        transactionDetails.insertMany(list[key].newDetails);                                       
                                        //update order
                                        transactionDetails.bulkWrite(updateTransObj);     
                                        if(order_loop && trans_loop)               
                                            res.json("Order generated successfully");                         
                                    }catch(e){
                                        console.log("Order::err in place order 1st part"+e);
                                    }
                                }                             
                            }
                        });
    
                        //update order table
                        updateOrderObj.push({
                            updateOne: {
                                filter: { _id:ObjectId(list[key]._id) },
                                update: { $set: { is_delivered: "YES" }}
                            }
                        });    
                        
                        i+=1;

                        if(i==order_size)
                            order_loop = true;
    
                    }
                    try{
                        orders.bulkWrite(updateOrderObj);         
                        if(order_loop && trans_loop)               
                            res.json("Orders generated successfully");
                    }catch(e){
                        console.log("Order::err in place order 2nd part"+e);
                    }
                }else{
                    res.json("No orders available");
                }
            }
        }, function(err){
            console.log("its error");
            res.json("Error Occurred!!");
        });       
        //res.json("Updated successfully!!");
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
                    let count = 0;
                    //removing all trasaction details 
                    if(req.body._id){
                        const query = { parent_id : ObjectId(req.body._id) };

                        transactionDetails.deleteMany(query)
                        .then(result => console.log(`Deleted ${result.deletedCount} item(s).`))
                        .catch(err => console.error(`Delete failed with error: ${err}`));
                    }                
                    //inserting new transactions
                    for (let i = 0, len = req.body.details.length; i < len; i++) {
                        req.body.details[i].parent_id = orders._id;
                        req.body.details[i].type = "ORDER";                
                        let newtransaction = new transactionDetails(req.body.details[i]);
                        newtransaction.save((errs,transaction)=>{
                            if(errs){
                                res.json(errs); 
                            }
                            count++
                            if(count === len) res.json({msg:'Orders added successfully'});
                        });
                    }
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