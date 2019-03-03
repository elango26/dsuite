const express = require('express');
const router = express.Router();

const employee = require('../models/employee');

router.get('/employeelist',(req,res,next)=>{
    
    employee.find((err,employeelist)=>{
        if(err){
            res.json(err);
        }else{
            res.json(employeelist);
        }
    });
});

router.post('/create',(req,res,next)=>{
    
    let newEmployee = new employee(req.body);

    newEmployee.save((err,employee)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'employee added successfully'});
        }
    });
});

router.put('/update/:id',(req,res,next)=>{

    employee.findByIdAndUpdate(req.params.id, {$set: req.body},(err,employee)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'employee updated successfully'});
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    employee.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});



module.exports = router;