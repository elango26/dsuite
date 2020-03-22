const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');
const sales = require('../models/sales');
const purchase = require('../models/purchase');
const product = require('../models/product');
const transactionDetails = require('../models/transactiondetails');

router.get('/sales',(req,res,next)=>{
    
    sales.aggregate([
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
        }},
        {
        "$sort":{
            "sale_date":-1
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
                            "$match": { 
                                "$and": [ 
                                        {parent_id: ObjectId(list[i]._id) },
                                        {type: 'SALES' },
                                        {is_active: 'YES'},
                                        {is_delete: 'NO'}
                                    ]
                            }
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
                        if(!err) list[processedCount].details = detail;
                        result.push(list[processedCount]);
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

router.get('/purchase',(req,res,next)=>{
    
    purchase.aggregate([
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
            "from": "vendors",
            "localField": "vendor_id",
            "foreignField": "_id",
            "as": "vendorDetail"
        }},
        {
        "$sort":{
            "purchase_date":-1
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
                            "$match": { 
                                "$and": [ 
                                        {parent_id: ObjectId(list[i]._id) },
                                        {type: 'PURCHASE' },
                                        {is_active: 'YES'},
                                        {is_delete: 'NO'}
                                    ]
                            }                           
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
                        if(!err) list[processedCount].details = detail;
                        result.push(list[processedCount]);
                        processedCount++;
                        if(processedCount === len){
                            res.json(result);
                        } 
                    }); 
                }
            }else{
                res.json(result);
            }
        }
    });
});

router.get('/reportProductList',(req,res,next)=>{
    let _resp = {
        code : 201,
        message : "Something went wrong!",
        data: {}
    }
    product.aggregate([
        {"$group":{
            _id:{category:'$category',brand: '$brand_name'},
            products: {
              $push: '$$ROOT'
            },
            count:{
              $sum: 1
            }
        }}
    ]).exec((err,list)=>{
        if(!err){
            _resp.code = 200;
            _resp.message = "success";
            _resp.data = list;
            res.json(_resp);
        }else{
            _resp.message = err;
            res.json(_resp);
        }
    })
})

module.exports = router;