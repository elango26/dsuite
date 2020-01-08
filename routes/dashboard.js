const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');
const sales = require('../models/sales');
const expenses = require('../models/expense');
const purchase = require('../models/purchase');
const damage = require('../models/damage');

router.get('/grids',(req,res,next)=>{
    var cur_date = req.query.date;
    var _resp = {};
    var resp_data = {};
    promise1 = new Promise((resolve, reject) => {
        sales.aggregate([
            {"$addFields":{
                localDate: {$dateToString:{format:'%Y-%m-%d',date:'$sale_date',timezone:'+05:30'}}
            }},
            {"$group":{
                _id: '$localDate',
                value: {
                  $sum  : '$total_amount'
                }
            }},
            {"$match":{
                _id:cur_date
            }}
        ]).exec((err,result)=>{
            if(!err){
                //console.log(result);
                resp_data['sales'] = result;
                resolve(resp_data);
            }else{
                resp_data['sales_err'] = err;
                reject(resp_data);
            }
        });
    });

    promise2 = new Promise((resolve, reject) => {
        expenses.aggregate([
            {"$addFields":{
                localDate: {$dateToString:{format:'%Y-%m-%d',date:'$createdAt',timezone:'+05:30'}}
            }},
            {"$group":{
                _id: '$localDate',
                value: {
                  $sum  : '$amount'
                }
            }},
            {"$match":{
                _id:cur_date
            }}
        ]).exec((err,result)=>{
            if(!err){
                //console.log(result);
                resp_data['expenses'] = result;
                resolve(resp_data);
            }else{
                resp_data['expenses_err'] = err;
                reject(resp_data);
            }
        });
    });

    promise3 = new Promise((resolve, reject) => {
        purchase.aggregate([
            {"$addFields":{
                localDate: {$dateToString:{format:'%Y-%m-%d',date:'$createdAt',timezone:'+05:30'}}
            }},
            {"$group":{
                _id: '$localDate',
                value: {
                  $sum  : '$total_amount'
                }
            }},
            {"$match":{
                _id:cur_date
            }}
        ]).exec((err,result)=>{
            if(!err){
                //console.log(result);
                resp_data['purchases'] = result;
                resolve(resp_data);
            }else{
                resp_data['purchases_err'] = err;
                reject(resp_data);
            }
        });
    });

    promise4 = new Promise((resolve, reject) => {
        damage.aggregate([
            {"$addFields":{
                localDate: {$dateToString:{format:'%Y-%m-%d',date:'$damage_date',timezone:'+05:30'}}
            }},
            {"$group":{
                _id: '$localDate',
                value: {
                  $sum  : '$total_amount'
                }
            }},
            {"$match":{
                _id:cur_date
            }}
        ]).exec((err,result)=>{
            if(!err){
                //console.log(result);
                resp_data['damages'] = result;
                resolve(resp_data);
            }else{
                resp_data['damages_err'] = err;
                reject(resp_data);
            }
        });
    });

    Promise.all([promise1, promise2,promise3,promise4]).then(function(result){
        _resp = {
            code : 200,
            message : "success!!",
            data: resp_data
        }
        res.json(_resp);
    });

});

module.exports = router;