const express = require('express');
const router = express.Router();

const vendor = require('../models/vendor');

router.get('/list',(req,res,next)=>{
    
    vendor.aggregate([
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
            res.json(list);
        }
    });
});

router.post('/create',(req,res,next)=>{

    let newVendor = new vendor(req.body);

    newVendor.save((err,vendor)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'vendor added successfully'});
        }
    });
});

router.put('/update/:id',(req,res,next)=>{

    vendor.findByIdAndUpdate(req.params.id, {$set: req.body},(err,vendor)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'vendor updated successfully'});
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    
    vendor.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});



module.exports = router;