const express = require('express');
const router = express.Router();

const discount = require('../models/discount');

router.get('/list',(req,res,next)=>{
    
    discount.find((err,discountlist)=>{
        res.json(discountlist);
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