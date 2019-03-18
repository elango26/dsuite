const express = require('express');
const router = express.Router();

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
            res.json(list);
        }
    });
});

router.post('/create',(req,res,next)=>{

    let newCustomer = new customer(req.body);

    newCustomer.save((err,customer)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'customer added successfully'});
        }
    });
});

router.put('/update/:id',(req,res,next)=>{

    customer.findByIdAndUpdate(req.params.id, {$set: req.body},(err,customer)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'customer updated successfully'});
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    
    customer.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});



module.exports = router;