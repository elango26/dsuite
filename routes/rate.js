const express = require('express');
const router = express.Router();

const rate = require('../models/rate');

router.get('/ratelist',(req,res,next)=>{
    
    rate.find((err,ratelist)=>{
        if(err){
            res.json(err);
        }else{
            res.json(ratelist);
        }
    });
});

router.post('/create',(req,res,next)=>{
    
    let newRate = new rate(req.body);

    newRate.save((err,rate)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'rate added successfully'});
        }
    });
});

router.put('/update/:id',(req,res,next)=>{

    rate.findByIdAndUpdate(req.params.id, {$set: req.body},(err,rate)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'rate updated successfully'});
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    
    rate.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});



module.exports = router;