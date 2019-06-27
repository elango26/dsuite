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
        { "$unwind": "$sales" },
        {
            "$group": {
                "_id": "$sales.customer_id",                            
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
        { "$unwind": "$payments" },
        {
            "$group": {
                "_id": "$payments.customer_id",                            
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
    ]).exec((err,leads)=>{
        if(err){
            res.json(err);
        }else{
            res.json(leads);
        }
    });   
});

module.exports = router;