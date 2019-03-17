const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');

const rate = require('../models/rate');

router.get('/list',(req,res,next)=>{
    
    rate.aggregate([
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
    
router.post('/create',(req,res,next)=>{
        
    let newRate = new rate(req.body);

    newRate.save((err,rate)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'rate added successfully'});
        }
    });
});

router.put('/update/:id',(req,res,next)=>{

    rate.findByIdAndUpdate(req.params.id, {$set: req.body},(err,rate)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'rate updated successfully'});
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    
    rate.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});



module.exports = router;