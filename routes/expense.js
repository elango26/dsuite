const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');

const expense = require('../models/expense');

router.get('/list',(req,res,next)=>{
    
    expense.aggregate([
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
     
    let newExpense = new expense(req.body);

    newExpense.save((err,expense)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'Expense added successfully'});
        }
    });
});

router.put('/update/:id',(req,res,next)=>{

    expense.findByIdAndUpdate(req.params.id, {$set: req.body},(err,expense)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'Expense updated successfully'});
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    expense.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});



module.exports = router;