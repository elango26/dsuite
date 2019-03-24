const express = require('express');
const router = express.Router();

const product = require('../models/product');

router.get('/list',(req,res,next)=>{
    
    product.aggregate([
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
            "from": "vendors",
            "localField": "vendor_id",
            "foreignField": "_id",
            "as": "vendor"
        }}
    ]).exec((err,list)=>{
        if(err){
            res.json(err);
        }else{
            res.json(list);
        }
    });
});
    
router.get('/orderList',(req,res,next)=>{
    
    product.aggregate([
        //{ $match: { status: "A" } },
        //{ $group: { _id: "$cust_id", total: { $sum: "$amount" } } },
        //{ $sort: { total: -1 } }
        { $group: { _id: {category:"$category",sub:"$sub_category"}}},
        { $group : { 
            _id :  "$_id.category",
            terms: { 
                $push: { 
                    term:"$_id.sub"
                }
            }
         }
       }
    ]).exec((err,list)=>{
        if(err){
            res.json(err);
        }else{
            res.json(list);
        }
    });
});

router.post('/create',(req,res,next)=>{
        
    let newProduct = new product(req.body);

    newProduct.save((err,product)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'product added successfully'});
        }
    });
});

router.put('/update/:id',(req,res,next)=>{

    product.findByIdAndUpdate(req.params.id, {$set: req.body},(err,product)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'product updated successfully'});
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    product.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});



module.exports = router;