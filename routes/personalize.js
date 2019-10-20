const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');

const customer = require('../models/customer');
const product = require('../models/product');

router.get('/customer',(req,res,next)=>{

    customer.aggregate([
        {"$match":{
            is_active: "YES",
            is_delete: "NO"
          }}
    ]).exec((err,list)=>{
        if(err){
            res.json(err);
        }else{
            res.json(list);
        }
    });
});

router.get('/product',(req,res,next)=>{
    
    product.aggregate([
        {"$match":{
            is_active: "YES",
            is_delete: "NO"
          }}
    ]).exec((err,list)=>{
        if(err){
            res.json(err);
        }else{
            res.json(list);
        }
    });
});

router.post('/modifyIndex',(req,res,next)=>{
    var updateObj = [];
    var _resp = {};
    if(req.body.type == 'customer'){
        for(key in req.body.arrayObject){
            let val = req.body.arrayObject[key];
            updateObj.push({
                updateOne: {
                    filter: { _id:ObjectId(val._id) },
                    update: { $set: {index: key}}
                }
            })
        }
        console.log("arr::"+updateObj);
        try {
            customer.bulkWrite(updateObj);    
            _resp = {
                code : 200,
                message : "Updated successfully",
                data: []
            }        
        }catch (e){
            _resp = {
                code : 201,
                message : "Error Occurred",
                data: []
            };
        }        
    } else if(req.body.type == 'product'){
        for(key in req.body.arrayObject){
            let val = req.body.arrayObject[key];
            updateObj.push({
                updateOne: {
                    filter: { _id:ObjectId(val._id) },
                    update: { $set: {index: key}}
                }
            })
        }
        console.log("arr::"+updateObj);
        try {
            product.bulkWrite(updateObj);    
            _resp = {
                code : 200,
                message : "Updated successfully",
                data: []
            }        
        }catch (e){
            _resp = {
                code : 201,
                message : "Error Occurred",
                data: []
            };
        }       
    }   
    res.json(_resp); 
});

module.exports = router;