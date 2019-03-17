const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');

const discount = require('../models/discount');

router.get('/list',(req,res,next)=>{
    
    discount.aggregate([
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
    
    let newDiscount = new discount(req.body);

    newDiscount.save((err,discount)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'discount added successfully'});
        }
    });
});

router.put('/update/:id',(req,res,next)=>{

    discount.findByIdAndUpdate(req.params.id, {$set: req.body},(err,discount)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'discount updated successfully'});
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    discount.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});



module.exports = router;