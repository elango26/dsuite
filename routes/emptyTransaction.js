const express = require('express');
const router = express.Router();

const mtTrans = require('../models/emptyTransaction');
const mtMngmt = require('../models/emptymanagement');

let _resp = {
    code : 201,
    message : "Error Occurred",
    data: []
};

router.get('/mngmtList',(req,res,next)=>{
    
    mtMngmt.aggregate([]).exec((err,list)=>{
        if(err){
            res.json(_resp);
        }else{
            res.json(_resp);
        }
    });
});

router.get('/transList',(req,res,next)=>{
    
    mtTrans.aggregate([]).exec((err,list)=>{
        if(err){
            res.json(_resp);
        }else{
            res.json(_resp);
        }
    });
});

router.post('/mngmtCreate',(req,res,next)=>{
    let overallMT = new mtMngmt(req.body);
    overallMT.save((err,mtmange)=>{
        if(err){
            res.json(_resp);
        }else{
            res.json(_resp);
        }
    });
});

router.put('/update/:id',(req,res,next)=>{

    mtMngmt.findByIdAndUpdate(req.params.id, {$set: req.body},(err,vendor)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'vendor updated successfully'});
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    
    mtMngmt.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});



module.exports = router;