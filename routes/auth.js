const express = require('express');
const router = express.Router();

const user = require('../models/user');

router.post('/authenticate',(req,res,next)=>{
    user.aggregate([
        {
        "$match":{
            "username": req.body.username,
            "password": req.body.password,
            "is_active": "YES"
        }}],(err,users)=>{
            if(!err){
                _resp = {
                    code : 200,
                    message : "",
                    data: []
                }
                if(users.length > 0){
                    _resp.message = "Validated";
                    _resp.data = users;
                }else{
                    _resp.code = 401;
                    _resp.message = "Invalid username/password";
                }              
                res.json(_resp);
            }else{
                _resp = {
                    code : 201,
                    message : "Error in auth service",
                    data: []
                }
                res.json(_resp);
            }
        })
});

module.exports = router;