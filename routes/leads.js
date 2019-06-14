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
        }}
    ]).exec((err,list)=>{
        if(err){
            res.json(err);
        }else{
            if(list && list.length > 0){  
                let processedCount = 0;  
                let len = list.length;            
                for(key in list){      
                    sales.aggregate([
                        {
                            "$match": { customer_id: ObjectId(list[key]._id) }
                        },
                        // {
                        //     "$project": { 
                        //         credit: {   
                        //             "$cond": ["$credit", "$amount", {
                        //                 "$subtract": [0, "$amount"]
                        //             }]
                        //         } 
                        //     }
                        // },
                        {
                        "$group": {    
                            "_id": "$customer_id",                            
                            "totalAmt": { $sum: "$total_amount" },
                            "count": { $sum: 1 }
                            }
                        }
                    ]).exec((err,credit)=>{ 
                        console.log("hey::"+credit);
                        let amount = 0;
                        if(!err) {
                            payments.aggregate([
                                {
                                    "$match": { customer_id: ObjectId(list[key]._id) }
                                },
                                {
                                "$group": {    
                                    "_id": "$customer_id",                            
                                    "totalAmt": { $sum: "$amount"}                                    
                                    }
                                }
                            ]).exec((err,debit)=>{
                                console.log("inside pay::"+credit[0].totalAmt);
                                if(!err){
                                    amount = debit[0].totalAmt;
                                    console.log("Insiee:"+ amount);
                                }else{
                                    console.log("err::"+ err);
                                }                              
                            });                            
                        }
                        console.log("last"+amount);
                        list[processedCount]['totalAmount'] = credit[0].totalAmt - amount;
                        processedCount++;
                        if(processedCount === len){
                            res.json(list);
                        } 
                    }); 
                }                
            }else{
                res.json(list);
            }   
            //res.json(list);        
        }
    });
});

module.exports = router;