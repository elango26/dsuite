const express = require('express');
const router = express.Router();

const route = require('../models/route');

router.get('/list',(req,res,next)=>{
    
    route.find((err,routelist)=>{
        if(err){
            res.json(err);
        }else{
            res.json(routelist);
        }
    });
});

router.post('/create',(req,res,next)=>{
    
    let newRoute = new route(req.body);

    newRoute.save((err,route)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'route added successfully'});
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