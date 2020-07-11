const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');
const orders = require('../models/order');
const transactionDetails = require('../models/transactiondetails');
const customer = require('../models/customer');
const product = require('../models/product');

router.get('/list',(req,res,next)=>{
    var customerMatchArr = [{"is_active":"YES"}];
    var orderMatchArr = [
      { $eq: ['$customer_id', '$$cust_id'] },
      { $eq: ['$local_date',req.query.order_date]},
      { $eq: ['$is_delivered', 'NO']},
    ];
    
    if(req.query.route != 'all'){    
      let routes = req.query.route;
      let matArr = [];
      routes.split(',').forEach(element => {
        matArr.push({"route":ObjectId(element)});
      });
      customerMatchArr.push({"$or": matArr}); 
    }

    if(req.query.search_key != ""){
      customerMatchArr.push({"customerName":RegExp(req.query.search_key, 'i')});      
    }
    customer.aggregate([   
        {"$match":{
          "$and": customerMatchArr
        }},    
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
                        $and: orderMatchArr
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
            as: 'orders.details',
            let: { parent_id: '$orders._id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$parent_id', '$$parent_id'] },
                      { $eq: ['$is_active','YES']},
                      { $eq: ['$is_delete','NO']}
                    ]
                  }
                }
              }
            ]
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
            _id: {customer:'$_id',orders:'$orders._id',product:'$orders.details.product_id'},
            //orders: {$push:'$orders._id'},
            count: {
              $sum : '$orders.details.prod_quan'
            },
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
          }},
          {"$sort":{
              "_id.customer.route": 1,
              "_id.customer.index": 1
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
      as: 'details',
      let: { parent_id: '$_id' },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ['$parent_id', '$$parent_id'] },
                { $eq: ['$is_active','YES']},
                { $eq: ['$is_delete','NO']}
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
      as: 'details',
      let: { parent_id: '$_id' },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ['$prod_id', '$$parent_id'] },
                { $eq: ['$is_active','YES']},
                { $eq: ['$is_delete','NO']}
              ]
            }
          }
        }
      ]
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