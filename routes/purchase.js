const express = require('express');
const router = express.Router();

const purchase = require('../models/purchase');

router.get('/list',(req,res,next)=>{

    purchase.find((err,purchaselist)=>{
        if(err){
            res.json(err);
        }else{
            res.json(purchaselist);
        }
    });
});

router.post('/create',(req,res,next)=>{
    
    let newPurchase = new purchase(req.body);

    newPurchase.save((err,purchase)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'purchase added successfully'});
        }
    });
});

router.put('/update/:id',(req,res,next)=>{

    purchase.findByIdAndUpdate(req.params.id, {$set: req.body},(err,purchase)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'purchase updated successfully'});
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    
    purchase.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});



module.exports = router;