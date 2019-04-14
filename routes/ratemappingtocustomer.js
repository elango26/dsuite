const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');

const rate = require('../models/rate');
const rateMapping = require('../models/ratemappingtocustomer');
const customer = require('../models/customer');

router.get('/list',(req,res,next)=>{
    
    rateMapping.aggregate([
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
            "as": "customer"
        }}
    ]).exec((err,list)=>{
        if(err){
            res.json(err);
        }else{
            res.json(list);
        }
    });
});

router.get('/rate',(req,res,next)=>{
    let condition;
    if(req.type == 'custom'){
        condition = {
            "$match": { type: 'custom',customer_id: ObjectId(req.customer_id) }
        }
    }else{
        condition = {
            "$match": { type: req.type }
        }
    }
    
    rate.aggregate([
        condition,
        {    
        "$lookup": {
            "from": "products",
            "localField": "prod_id",
            "foreignField": "_id",
            "as": "product"
        }}
    ]).exec((err,list)=>{
        if(err){
            res.json(err);
        }else{
            res.json(list);
        }
    });
});

router.get('/customers',(req,res,next)=>{

    rateMapping.aggregate([
        { "$project": { 
            "customer_id": 1
        }} 
    ]).exec((err,list)=>{
        if(err){
            res.json(err);
        }else{
            let customerIds = [];
            if(list && list.length){
                for (let i = 0, len = list.length; i < len; i++) {
                    if((customerIds.indexOf(list[i].customer_id)) < 0) customerIds.push(list[i].customer_id);
                }
            }
            customer.find( { _id: { $nin: customerIds } },(err,list)=>{
                if(err){
                    res.json(err);
                }else{
                    res.json(list);
                }
            });

        }
    });

});
    
router.post('/create',(req,res,next)=>{
        
    let newRate = new rate(req.body);

    let rows = [], customRows = [];
    req.body.mapping.forEach(element => {
        if(element.type){
            rows.push({
                customer_id : ObjectId(element.customer_id),
                type : element.type,
                createdBy : req.body.createdBy
            });

            if(element.custom && element.type == 'custom'){
                element.custom.forEach(elem =>{
                    customRows.push({
                        customer_id : element.customer_id,
                        prod_id : elem.prod_id,
                        type : elem.type,
                        price : elem.price,
                        tax : elem.tax,
                        createdBy : req.body.createdBy
                    });
                });
            }  
        }      
    });

    rateMapping.collection.insert(rows,(err,ratemappting)=>{
        if(err){
            res.json(err);
        }else{
            if(customRows.length){
                rate.collection.insert(customRows,(errs,rate)=>{
                    if(errs){
                        res.json(errs);
                    }else{
                        res.json({msg:'rate mapping added successfully'});
                    }
                });
            }else{
                res.json({msg:'rate mapping successfully'});
            }
        }
    });
});

router.put('/update/:id',(req,res,next)=>{

    rateMapping.findByIdAndUpdate(req.params.id, {$set: req.body},(err,rate)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'rate updated successfully'});
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    
    rateMapping.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});



module.exports = router;