const express = require('express');
const jwt = require('jsonwebtoken');
var env = require('dotenv').config();
const request = require("request");
const router = express.Router();

const user = require('../models/user');

router.post('/token_validate', (req, res, next)=>{
      
    let token = req.body.recaptcha;
    const secretkey = "6LfInckZAAAAAL2TeGldMAJ7Lb6kPGeW-Th5wWiu"; //the secret key from your google admin console;
    
    //token validation url is URL: https://www.google.com/recaptcha/api/siteverify 
    // METHOD used is: POST
    
    const url =  `https://www.google.com/recaptcha/api/siteverify?secret=${secretkey}&response=${token}&remoteip=${req.connection.remoteAddress}`
     
    //note that remoteip is the users ip address and it is optional
    // in node req.connection.remoteAddress gives the users ip address
    
    if(token === null || token === undefined){
      res.status(201).send({success: false, message: "Token is empty or invalid"})
      return console.log("token empty");
    }
    
    request(url, function(err, response, body){
      //the body is the data that contains success message
      body = JSON.parse(body);
      
      //check if the validation failed
      if(body.success !== undefined && !body.success){
           res.send({success: false, 'message': "recaptcha failed"});
           return console.log("failed")
       }
      
      //if passed response success message to client
       res.send({"success": true, 'message': "recaptcha passed"});
      
    })
  
});
  

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
                    users[0]['token'] = jwt.sign({username: req.body.username},
                        env.parsed.JWT_KEY,
                        { expiresIn: '30d' // 24h expires in 24 hours
                        }
                    );                    
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