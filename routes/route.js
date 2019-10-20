const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');

const common = require('./common');
const route = require('../models/route');

router.get('/list',(req,res,next)=>{
    
    route.aggregate([
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
    route.countDocuments(function(err, count) {
        if(!err){    
            req.body['route_id'] = common.padding(count+1,7,'R');
            let newRoute = new route(req.body);

            newRoute.save((err,route)=>{
                if(err){
                    res.json(err);
                }else{
                    res.json({msg:'route added successfully'});
                }
            });
        }else{
            res.json({msg:'Error in count:: Route'});
        }
    });
});

router.put('/update/:id',(req,res,next)=>{

    route.findByIdAndUpdate(req.params.id, {$set: req.body},(err,route)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'route updated successfully'});
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    route.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});



module.exports = router;