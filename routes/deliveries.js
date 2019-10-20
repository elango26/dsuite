const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');
const orders = require('../models/order');
const transactionDetails = require('../models/transactiondetails');
const customer = require('../models/customer');
const product = require('../models/product');

router.get('/list',(req,res,next)=>{
    customer.aggregate([
        {"$lookup":{
            from: 'orders',
            as: 'orders',
            let: { cust_id: '$_id' },
            pipeline: [
              {
                $addFields:{
                    'local_date': { "$dateToString": { format: "%Y-%m-%d", date: "$order_date", timezone: "+05:30" } }
                }
              },
                {
                    $match: {
                    $expr: {
                        $and: [
                        { $eq: ['$customer_id', '$$cust_id'] },
                        { $eq: ['$local_date',req.query.order_date]},
                        { $eq: ['$is_delivered', 'NO']}
                        ]
                    }
                    }
                }
            ]
          }},
        {"$unwind":{
            path: '$orders',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
          }},        
        // {"$addFields":{
        //   'orders.localdate': { "$dateToString": { format: "%Y-%m-%d", date: "$orders.order_date", timezone: "+05:30" } }
        // }},
        // {"$match":{
        //   'orders.localdate':req.query.order_date
        // }},
        {"$lookup":{
            from: 'transactiondetails',
            localField: 'orders._id',
            foreignField: 'parent_id',
            as: 'orders.details'
          }},
        {"$unwind":{
            path: '$orders.details',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
          }},
        {"$lookup":{
            from: 'products',
            localField: 'orders.details.prod_id',
            foreignField: '_id',
            as: 'orders.details.products'
          }},
        {"$unwind":{
            path: '$orders.details.products',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
          }},
        {"$group":{
            _id: {customer:'$_id',orders:'$orders._id'},
            //orders: {$push:'$orders._id'},

            details: {
              $push:'$orders.details'
            }
          }},
        {"$lookup":{
            from: 'orders',
            localField: '_id.orders',
            foreignField: '_id',
            as: '_id.orders'
          }},
        {"$lookup":{
            from: 'customers',
            localField: '_id.customer',
            foreignField: '_id',
            as: '_id.customer'
          }},
        {"$unwind":{
            path: '$_id.customer',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
          }},
        {"$unwind":{
            path: '$_id.orders',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
          }}
    ]).exec((err,list)=>{
        if(err){
            res.json(err);
        }else{
            res.json(list);
        }
    });
});

router.get('/consolidatelist',(req,res,next)=>{
  orders.aggregate([
    {"$addFields":{
      'local_date': { "$dateToString": { format: "%Y-%m-%d", date: "$order_date", timezone: "+05:30" } }
    }},
    {"$match":{
      local_date:req.query.order_date
    }},
    {"$lookup":{
      from: 'transactiondetails',
      localField: '_id',
      foreignField: 'parent_id',
      as: 'details'
    }},
    {"$unwind":{
      path: '$details',
      //includeArrayIndex: '<<string>>',
      preserveNullAndEmptyArrays: true
    }},
    {"$group":{
      _id: '$details.prod_id',
      count: {
        $sum : '$details.prod_quan'
      }
    }},
    {"$lookup":{
      from: 'products',
      localField: '_id',
      foreignField: '_id',
      as: 'products'
    }},
    {"$unwind":{
      path: '$products',
      //includeArrayIndex: '<<string>>',
      preserveNullAndEmptyArrays: true
    }}
  ]).exec((err,list) => {
    if(err){
      res.json(err);
  }else{
      res.json(list);
  }
  });
});

router.get('/newconsolidatelist',(req,res,next)=>{
  product.aggregate([
    {"$lookup":{
      from: 'transactiondetails',
      localField: '_id',
      foreignField: 'prod_id',
      as: 'details'
    }},
    {"$unwind":{
      path: '$details',
     // includeArrayIndex: '<<string>>',
      preserveNullAndEmptyArrays: true
    }},
    {"$lookup":{
      from: 'orders',
          // localField: 'details.parent_id',
          // foreignField: '_id',
          as: 'details.orders',
          let: { order_id: '$details.parent_id' },
          pipeline: [
            {
              $addFields:{
                  'local_date': { "$dateToString": { format: "%Y-%m-%d", date: "$order_date", timezone: "+05:30" } }
              }
            },
            {$match:{
              $expr:{
                $and:[
                  { $eq: ['$_id', '$$order_id'] },
                  { $eq: ['$local_date','2019-09-02']}
                  ]
              }
            }}
          ]
    }},
    {"$unwind":{
      path: '$details.orders',
      //includeArrayIndex: '<<string>>',
      preserveNullAndEmptyArrays: true
    }},
    {"$group":{
      _id: {product:'$_id'},
      count: {
        $sum: '$details.prod_quan'
      }
    }},
    {"$lookup":{
      from: 'products',
      localField: '_id.product',
      foreignField: '_id',
      as: '_id.product'
    }},
    {"$unwind":{
      path: '$_id.product',
      //includeArrayIndex: '<<string>>',
      preserveNullAndEmptyArrays: true
    }}
  ]).exec((err,list) => {
    if(err){
      res.json(err);
  }else{
      res.json(list);
  }
  });
});

module.exports = router;