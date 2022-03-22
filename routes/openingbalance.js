const express = require('express');
const router = express.Router();

const ob = require('../models/openingbalance');

router.get('/list',(req,res,next)=>{
    
    ob.aggregate([
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
        }},
        {
        "$unwind":{
            path: '$customer',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
        }},
        {
        "$lookup":{
            "from": "routes",
            "localField": "customer.route",
            "foreignField": "_id",
            "as": "customer.route"
        }},
        {
        "$unwind":{
            path: '$customer.route',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
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
    ob.countDocuments(function(err, count) {
        let newOb = new ob(req.body);

        newOb.save((err,ob)=>{
            if(err){
                res.json(err);
            }else{
                res.json({msg:'balance added successfully'});
            }
        });
    });
});

router.put('/update/:id',(req,res,next)=>{

    ob.findByIdAndUpdate(req.params.id, {$set: req.body},(err,ob)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'balance updated successfully'});
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    ob.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});



module.exports = router;