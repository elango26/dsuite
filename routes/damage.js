const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');
const damage = require('../models/damage');
const transactionDetails = require('../models/transactiondetails');
const common = require('./common');

router.get('/list',(req,res,next)=>{
    
    damage.aggregate([
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
            "damage_date":-1
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
            }else{
                res.json(result);
            }
        }
    });
});
    
router.post('/create',(req,res,next)=>{
    damage.countDocuments(function(err, count) {
        if(!err){   
    
            if(req.body.createdBy) req.body.createdBy = {_id: ObjectId(req.body.createdBy)}
            req.body['damage_id'] = common.padding(count+1,7,'W');
            let newDamage = new damage(req.body);

            newDamage.save((err,damage)=>{
                if(err){
                    res.json(err);
                }else{
                    if(!req.body.details || !req.body.details.length) res.json({msg:'Damage updated successfully'});
                    let count = 0;
                    for (let i = 0, len = req.body.details.length; i < len; i++) {
                        req.body.details[i].parent_id = damage._id;
                        req.body.details[i].parent_date = damage.damage_date;
                        req.body.details[i].type = "DAMAGE";
                        let newtransaction = new transactionDetails(req.body.details[i]);
                        newtransaction.save((errs,transaction)=>{
                            if(errs){
                                res.json(errs); 
                            }
                            count++
                            if(count === len) res.json({msg:'Damage added successfully'});
                        });
                    }
                }
            });
        }else{
            res.json({msg:'Error in count:: Damage'});
        }
    });
});

router.put('/update/:id',(req,res,next)=>{

    damage.findByIdAndUpdate(req.params.id, {$set: req.body},(err,damage)=>{
        if(err){
            res.json(err);
        }else{
            transactionDetails.deleteMany({ parent_id : damage._id });
            if(!req.body.details || !req.body.details.length) res.json({msg:'Damage updated successfully'});
            let count = 0;
            for (let i = 0, len = req.body.details.length; i < len; i++) {
                req.body.details[i].parent_id = damage._id;
                req.body.details[i].parent_date = damage.damage_date;
                req.body.details[i].type = "DAMAGE";
                let newtransaction = new transactionDetails(req.body.details[i]);
                newtransaction.save((errs,transaction)=>{
                    if(errs){
                        res.json(errs);
                    }
                    count++
                    if(count === len) res.json({msg:'Damage updated successfully'});
                });
            }
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    
    damage.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            transactionDetails.deleteMany({ parent_id : req.params.id });
            res.json(result);
        }
    });
});



module.exports = router;