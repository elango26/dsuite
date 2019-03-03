const express = require('express');
const router = express.Router();

const sales = require('../models/sales');

router.get('/list',(req,res,next)=>{
    
    sales.find((err,saleslist)=>{
        if(err){
            res.json(err);
        }else{
            res.json(saleslist);
        }
    });
});

router.post('/create',(req,res,next)=>{
    
    let newSales = new sales(req.body);

    newSales.save((err,sales)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'sales added successfully'});
        }
    });
});

router.put('/update/:id',(req,res,next)=>{

    sales.findByIdAndUpdate(req.params.id, {$set: req.body},(err,sales)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'sales updated successfully'});
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    
    sales.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});



module.exports = router;