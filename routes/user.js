const express = require('express');
const router = express.Router();

const user = require('../models/user');

router.get('/list',(req,res,next)=>{

    user.aggregate([
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
    ]).exec((err,userlist)=>{
        if(err){
            res.json(err);
        }else{
            res.json(userlist);
        }
    });
});

router.post('/create',(req,res,next)=>{
    
    let newUser = new user(req.body);

    newUser.save((err,userRes)=>{
        if(err){
            res.json(err);
        }else{
          res.json({msg:'user added successfully'});
        }
    });
});

router.put('/update/:id',(req,res,next)=>{
    
    user.findByIdAndUpdate(req.params.id, {$set: req.body},(err,user)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'user updated successfully'});
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    
    user.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});



module.exports = router;