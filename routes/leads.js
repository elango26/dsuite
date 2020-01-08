const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');
const sales = require('../models/sales');
const transactionDetails = require('../models/transactiondetails');
const customer = require('../models/customer');
const payments = require('../models/payments');

router.get('/list',(req,res,next)=>{
    customer.aggregate([        
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
            "from": "routes",
            "localField": "route",
            "foreignField": "_id",
            "as": "routes"
        }},
        {    
        "$lookup": {
            "from": "sales",
            "localField": "_id",
            "foreignField": "customer_id",
            "as": "sales"
        }},
        { "$unwind": {
            path: '$sales',
            //includeArrayIndex: 'sales',
            preserveNullAndEmptyArrays: true
          }},
        {
            "$group": {
                "_id": "$_id",                            
                "debit": { $sum: "$sales.total_amount" },
                "debit_count": { $sum: 1 },
                "customer":{
                    $push:"$$ROOT"
                }            
            }
        },
        {
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$customer", 0 ] }, "$$ROOT" ] } }
        },
        { $project: { customer: 0, sales: 0 } },
        {    
        "$lookup": {
            "from": "payments",
            "localField": "_id",
            "foreignField": "customer_id",
            "as": "payments"
        }},
        { "$unwind": {
            path: '$payments',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
        }},
        {
            "$group": {
                "_id": "$_id",                            
                "credit": { $sum: "$payments.amount" },
                "credit_count": { $sum: 1 },
                "customer": {
                    $push: '$$ROOT'
                }
            }
        },
        {
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$customer", 0 ] }, "$$ROOT" ] } }
        },
        { $project: { customer: 0, payments: 0 } },
        {    
        "$lookup": {
            "from": "openingbalances",
            "localField": "_id",
            "foreignField": "customer_id",
            "as": "obs"
        }},
        { "$unwind": {
            path: '$obs',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
        }},
        {
            "$group": {
                "_id": "$_id",                            
                "openingbalance": { $sum: "$obs.amount" },
                "openingbalance_count": { $sum: 1 },
                "customer": {
                    $push: '$$ROOT'
                }
            }
        },
        {
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$customer", 0 ] }, "$$ROOT" ] } }
        },
        { $project: { customer: 0, payments: 0, obs: 0  } },
        {"$sort":{
            "route": 1,
            "index": 1
        }}
    ]).exec((err,leads)=>{
        if(err){
            res.json(err);
        }else{
            res.json(leads);
        }
    });   
});

router.get('/getTransactions',(req,res,next)=>{
    var _resp = {
        code : 201,
        message : "Error!!",
        data: []
    };
    var salesAgg = [
        {"$addFields":{
            localDate: {$dateToString:{format:'%Y-%m-%d',date:'$createdAt',timezone:'+05:30'}}
        }},
        {"$group":{
            _id: {date:'$localDate',customer:'$customer_id'},
            debit: {
              $sum: '$total_amount'
            },
            sale_ids:{
              $push:'$sale_id'
            }
        }}
    ];

    if(req.query.customer_id && req.query.customer_id !=""){
        salesAgg.unshift({"$match":{
            customer_id:ObjectId(req.query.customer_id)
          }});
    }
    sales.aggregate(salesAgg).exec((err,debits)=>{
        if(err){
            _resp.data = err;           
            res.json(_resp);
        }else{
            var payAgg = [
                {"$addFields":{
                    localDate: {$dateToString:{format:'%Y-%m-%d',date:'$createdAt',timezone:'+05:30'}}
                }},
                {"$group":{
                    _id: {date:'$localDate',customer:'$customer_id'},
                    credit: {
                      $sum: '$amount'
                    }
                }}
            ];
            if(req.query.customer_id && req.query.customer_id !=""){
                payAgg.unshift({"$match":{
                    customer_id:ObjectId(req.query.customer_id)
                  }});
            }
            payments.aggregate(payAgg).exec((err,credits)=>{
                if(err){
                    _resp.data = err;                    
                    res.json(_resp);
                }else{     
                    var totalArray = credits.concat(debits);
                    // totalArray.sort(function(a,b){
                    //     var key1 = new Date(a._id.date);
                    //     var key2 = new Date(b._id.date);

                    //     if (key1 < key2) {
                    //         return -1;
                    //     } else if (key1 == key2) {
                    //         return 0;
                    //     } else {
                    //         return 1;
                    //     }
                    // });

                    totalArray.sort(function(a,b){
                        return new Date(a._id.date)-new Date(b._id.date);
                    })
                    
                    _resp.data = totalArray.reverse();
                    _resp.code = 200;
                    _resp.message = "Data Loaded!";                   
                    res.json(_resp);
                }
            });
        }
    })
});

module.exports = router;