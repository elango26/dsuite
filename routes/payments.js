const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');

const payment = require('../models/payments');

router.get('/list',(req,res,next)=>{
    
    payment.aggregate([
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
    
router.post('/create',(req,res,next)=>{
     
    let newPayment = new payment(req.body);

    newPayment.save((err,payment)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'Payment added successfully'});
        }
    });
});

router.put('/update/:id',(req,res,next)=>{

    payment.findByIdAndUpdate(req.params.id, {$set: req.body},(err,payment)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'Payment updated successfully'});
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    payment.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});



module.exports = router;