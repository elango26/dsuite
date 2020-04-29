const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');
const purchase = require('../models/purchase');
const transactionDetails = require('../models/transactiondetails');
const common = require('./common');

router.get('/list',(req,res,next)=>{

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
                            "$match": { parent_id: ObjectId(list[i]._id),is_active:'YES',is_delete:'NO'}
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


router.get('/transaction',(req,res,next)=>{

    transactionDetails.aggregate([  
        {"$match":{
            "is_active":"YES",
            "is_delete":"NO"
        }},
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
    ]).exec((err,list)=>{
        if(err){
            res.json(err);
        }else{
            res.json(list); 
        }
    });
});
    
router.post('/create',(req,res,next)=>{
    purchase.countDocuments(function(err, count) {
        if(!err){         
            req.body['purchase_id'] = common.padding(count+1,7,'PUR');   
            let newPurchase = new purchase(req.body);

            newPurchase.save((err,purchase)=>{
                if(err){
                    res.json(err);
                }else{
                    if(!req.body.details || !req.body.details.length) res.json({msg:'purchase updated successfully'});
                    let count = 0;
                    for (let i = 0, len = req.body.details.length; i < len; i++) {
                        req.body.details[i].parent_id = purchase._id;
                        req.body.details[i].type = "PURCHASE";
                        let newtransaction = new transactionDetails(req.body.details[i]);
                        newtransaction.save((errs,transaction)=>{
                            if(errs){
                                res.json(errs); 
                            }
                            count++
                            if(count === len) res.json({msg:'purchase added successfully'});
                        });
                    }
                }
            });
        }else{
            res.json({msg:'Error in count:: Purchase'});
        }
    });
});

router.put('/update/:id',(req,res,next)=>{

    purchase.findByIdAndUpdate(req.params.id, {$set: req.body},(err,purchase)=>{
        if(err){
            res.json(err);
        }else{
            transactionDetails.deleteMany({ parent_id : purchase._id });
            if(!req.body.details || !req.body.details.length) res.json({msg:'purchase updated successfully'});
            let count = 0;
            for (let i = 0, len = req.body.details.length; i < len; i++) {
                req.body.details[i].parent_id = purchase._id;
                req.body.details[i].type = "PURCHASE";
                let newtransaction = new transactionDetails(req.body.details[i]);
                newtransaction.save((errs,transaction)=>{
                    if(errs){
                        res.json(errs); 
                    }
                    count++
                    if(count === len) res.json({msg:'purchase updated successfully'});
                });
            }
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    
    purchase.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            transactionDetails.deleteMany({ parent_id : req.params.id });
            res.json(result);
        }
    });
});



module.exports = router;