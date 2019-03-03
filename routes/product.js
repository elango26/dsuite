const express = require('express');
const router = express.Router();

const product = require('../models/product');

router.get('/productlist',(req,res,next)=>{
    
    product.find((err,productlist)=>{
        if(err){
            res.json(err);
        }else{
            res.json(productlist);
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