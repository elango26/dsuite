const express = require('express');
const router = express.Router();

const vendor = require('../models/vendor');
const common = require('./common');

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
    vendor.countDocuments(function(err, count) {
        if(!err){
            req.body['vendor_id'] = common.padding(count+1,7,'V');
            let newVendor = new vendor(req.body);
            newVendor.save((err,vendor)=>{
                if(err){
                    res.json(err);
                }else{
                    res.json({msg:'vendor added successfully'});
                }
            });
        }else{
            res.json({msg:'Error in count:: Vendor'});
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