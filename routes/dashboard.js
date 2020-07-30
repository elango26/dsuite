const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');
const user = require('../models/user');
const sales = require('../models/sales');
const expenses = require('../models/expense');
const purchase = require('../models/purchase');
const damage = require('../models/damage');
const payments = require('../models/payments');

router.get('/grids',(req,res,next)=>{
    var cur_date = req.query.date;
    var _resp = {};
    var resp_data = {};
    promise1 = new Promise((resolve, reject) => {
        sales.aggregate([
            {"$match":{
                "is_active": "YES",
                "is_delete": "NO"
            }},
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
        //console.log(result);
        _resp = {
            code : 200,
            message : "success!!",
            data: resp_data
        }
        res.json(_resp);
    });

});

router.get("/totalCredits",(req,res,next)=>{
    let _resp = {
        code : 201,
        message : "Something went wrong!",
        data: {}
    };
    let resp_data = {};
    let user_id = req.query.user_id;
    let date = req.query.date;
    pro_payment = new Promise((resolve,reject)=>{
        user.aggregate([
            {"$lookup":{
                from: 'payments',
                let : {'createdBy':'$_id'},
                as: 'payments',
                pipeline:[
                    {$match:{
                        $expr:{
                            $and:[
                                {$eq:['$createdBy','$$createdBy']},
                                {$eq:['$is_active','YES']},
                                {$eq:['$is_delete','NO']}
                            ]
                        }
                    }}
                ]
              }},
            {"$unwind":{
                path: '$payments',
              //  includeArrayIndex: 'string',
                preserveNullAndEmptyArrays: true
              }},
            {"$group":{
                _id: {'user_id':'$_id'},
                'username':{
                  $addToSet: '$username'
                },
                'total_credits': {
                  $sum: '$payments.amount'
                }
              }}
        ]).exec((err,payment)=>{
            if(err){
                resp_data['payments_err'] = err;
                reject(resp_data);
            }else{
                resp_data['payments'] = payment;
                resolve(resp_data);
            }
        });
    });

    pro_sales = new Promise((resolve,reject)=>{
        user.aggregate([
            {"$lookup":{
                from: 'sales',
                let : {'createdBy':'$_id'},
                as: 'sales',
                pipeline:[
                    {$match:{
                        $expr:{
                            $and:[
                                {$eq:['$createdBy','$$createdBy']},
                                {$eq:['$is_active','YES']},
                                {$eq:['$is_delete','NO']}
                            ]
                        }
                    }}
                ]
              }},
            {"$unwind":{
                path: '$sales',
              //  includeArrayIndex: 'string',
                preserveNullAndEmptyArrays: true
              }},
            {"$group":{
                _id: {'user_id':'$_id'},
                'username':{
                  $addToSet: '$username'
                },
                'total_credits': {
                  $sum: '$sales.total_amount'
                }
              }}
        ]).exec((err,sales)=>{
            if(err){
                resp_data['sales_err'] = err;
                reject(resp_data);
            }else{
                resp_data['sales'] = sales;
                resolve(resp_data);
            }
        });
    });

    Promise.all([pro_payment, pro_sales]).then(function(result){
        _resp = {
            code : 200,
            message : "success!!",
            data: resp_data
        }
        res.json(_resp);
    });
});

module.exports = router;