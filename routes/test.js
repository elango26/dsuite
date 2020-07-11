const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');
const sales = require('../models/sales');
const product = require('../models/product');
const customer = require('../models/customer');
const transactionDetails = require('../models/transactiondetails');
const common = require('./common');

router.get('/invoices',(req,res,next)=>{
    sales.aggregate([
        {"$addFields":{
            localDate: {$dateToString:{format:"%Y-%m-%d",date:'$sale_date',timezone:'+05:30'}}
        }},
        {"$match":{
            sale_id:'POS0000009'
        }},
        {"$lookup":{
            from: 'transactiondetails',
            as: 'details',
            let: { parent_id: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$parent_id', '$$parent_id'] },
                      { $eq: ['$type','SALES']},
                      { $eq: ['$is_active', 'YES']},
                      { $eq: ['$is_delete', 'NO']}
                    ]
                  }
                }
              }
            ]
        }},
        {"$unwind":{
            path: '$details',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
        }},
        {"$lookup":{
            from: 'products',
            localField: 'details.prod_id',
            foreignField: '_id',
            as: 'details.product'
        }},
        {"$unwind":{
            path: '$details.product',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
        }},
        {"$group":{
            _id: '$_id',
            'details': {
              $push : '$details'
            }
        }},
        {"$lookup":{
            from: 'sales',
            localField: '_id',
            foreignField: '_id',
            as: 'sales'
        }},
        {"$unwind":{
            path: '$sales',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
        }},
        {"$lookup":{
          from: 'discounttransactions',
          localField: 'sales.sale_id',
          foreignField: 'sale_id',
          as: 'sales.discount'
        }},
        {"$lookup":{
            from: 'customers',
            localField: 'sales.customer_id',
            foreignField: '_id',
            as: 'sales.customer'
        }},
        {"$unwind":{
            path: '$sales.customer',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
        }}
    ]).exec((err,list)=>{
        if(!err){
            let resp = {
                code : 200,
                message : "Invoice loaded!!",
                data: list
            }
            res.json(resp);
        }
    });
});

router.get('/productList',(req,res,next)=>{
  product.aggregate([
    // {"$group":{
    //   _id: {brand:'$brand_name',category:'$category',sub_category:'$sub_category'},
    //   products: {
    //     $push: '$$ROOT'
    //   },
    //   count:{
    //     $sum: 1
    //   }
    // }}
  ]).exec((err,list)=>{
    if(!err){
      res.json(list);
    }else{
      res.json(err);
    }
  });
});

router.get('/list',(req,res,next)=>{
    var arr = [];
    let dat1 = new Date();
    dat1.setDate(dat1.getDate() - 8);
    arr.push(dat1);
    let dat2 = new Date();
    dat2.setDate(dat2.getDate() - 1);
    arr.push(dat2);
    let dat3 = new Date();
    arr.push(dat3);
    console.log(arr);
    customer.aggregate([
        {"$lookup":{
          from: 'sales',
          localField: '_id',
          foreignField: 'customer_id',
          as: 'sales'
        }},
        {"$unwind":{
          path: '$sales',
          //includeArrayIndex: '<<string>>',
          preserveNullAndEmptyArrays: true
        }},
        { "$group": {
          "_id": {
            "customer": "$sales.customer_id",
            "dte": {
              "$let": {
                "vars": { 
                  "dte": "$sales.sale_date"
                },
                "in": {
                  "$switch": {
                    "branches": [
                      { "case": { "$lte": [ "$$dte", dat1 ] }, "then": "old" },
                      { "case": { "$lte": [ "$$dte", dat2 ] }, "then": "week" },
                      { "case": { "$lte": [ "$$dte", dat3 ] }, "then": "today" },
                    ]
                  }
                }
              }
            }
          },
          "sales": {
            "$sum": "$sales.total_amount"
          },
          "count": { "$sum": 1 }
        }}     
    ]).exec((err,result) => {
        if(!err){
          customer.aggregate([              
            {"$lookup":{
              from: 'payments',
              localField: '_id',
              foreignField: 'customer_id',
              as: 'payments'
            }},           
            {"$unwind":{
              path: '$payments',
              //includeArrayIndex: '<<string>>',
              preserveNullAndEmptyArrays: true
            }},
            { "$group": {
              "_id": {
                "customer": "$payments.customer_id",
                "dte": {
                  "$let": {
                    "vars": { 
                      "dte": "$payments.createdAt"
                    },
                    "in": {
                      "$switch": {
                        "branches": [
                          { "case": { "$lte": [ "$$dte", dat1 ] }, "then": "old" },
                          { "case": { "$lte": [ "$$dte", dat2 ] }, "then": "week" },
                          { "case": { "$lte": [ "$$dte", dat3 ] }, "then": "today" },
                        ]
                      }
                    }
                  }
                }
              },
              "paid": {
                "$sum": "$payments.amount"
              },
              "count": { "$sum": 1 }
            }}
          ]).exec((err,payments) => {
            if(!err){
              var sales_arr = {};          
              if(result.length > 0){
                for(let i=0;i<result.length;i++){
                  if(!sales_arr[result[i]._id.customer])
                    sales_arr[result[i]._id.customer] = [];
                  //console.log(sales_arr);
                  let temp = {
                    'dte': result[i]._id.dte,
                    'sales': result[i].sales,
                    'count': result[i].count
                  }
                  sales_arr[result[i]._id.customer].push(temp);
                  //console.log(sales_arr);
                }
              }

              var paid_arr = {}; 
              if(payments.length > 0){
                for(let i=0;i<payments.length;i++){
                  if(!paid_arr[payments[i]._id.customer])
                    paid_arr[payments[i]._id.customer] = [];
                  
                  let temp = {
                    'dte': payments[i]._id.dte,
                    'paid': payments[i].paid,
                    'count': payments[i].count
                  }
                  paid_arr[payments[i]._id.customer].push(temp);
                  //console.log(sales_arr);
                }                
              }
              let response = {
                'sales': sales_arr,
                'payments': paid_arr
              }
              res.json(response);
            }else{
              res.json(err);
            }
          });
        }else{
          res.json(err);
        }
    })
});

module.exports = router;