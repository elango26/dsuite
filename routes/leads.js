const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');
const sales = require('../models/sales');
const transactionDetails = require('../models/transactiondetails');
const customer = require('../models/customer');

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
        }}
    ]).exec((err,list)=>{
        if(err){
            res.json(err);
        }else{
            console.log('insdie leads');
            console.log('length:'+list.length);
            if(list && list.length > 0){                
                for(key in list){       
                    console.log('id:'+list[key]._id);             
                    sales.aggregate([
                        {
                            "$match": { customer_id: ObjectId(list[key]._id) }
                        },
                        {
                        "$group": {    
                            "_id": "$customer_id",                            
                            "totalAmt": { $sum: "$total_amount" },
                            "count": { $sum: 1 }
                            }
                        }
                    ]).exec((err,detail)=>{ 
                        if(!err) list[key]['totalAmount'] = detail;                        
                        if(key == list.length-1)
                            res.json(list);
                    }); 
                }
            }   
            //res.json(list);        
        }
    });
});

module.exports = router;