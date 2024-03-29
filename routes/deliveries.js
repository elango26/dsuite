const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');
const orders = require('../models/order');
const transactionDetails = require('../models/transactiondetails');
const customer = require('../models/customer');
const product = require('../models/product');
const common = require('./common');

router.get('/list',(req,res,next)=>{
  // //customers
  // var customerMatchArr = [{"is_active":"YES"}];
  // if(req.query.route != 'all'){    
  //   let routes = req.query.route;
  //   let matArr = [];
  //   routes.split(',').forEach(element => {
  //     matArr.push({"route":ObjectId(element)});
  //   });
  //   customerMatchArr.push({"$or": matArr}); 
  // }
  // if(req.query.search_key != ""){
  //   customerMatchArr.push({"customerName":RegExp(req.query.search_key, 'i')});      
  // }
  // customerPromise = new Promise((resolve,reject)=>{
  //   customer.aggregate([   
  //     {"$match":{
  //       "$and": customerMatchArr
  //     }}
  //   ]).exec((err,customers) => {
  //     if(!err){
  //       resolve(customers);
  //     }else{
  //       reject(err);
  //     }
  //   });
  // });
  // //order trans prods
  // const fYear = common.getFinancialYear(req.query.order_date);
  // ordersPromise = new Promise((resolve,reject)=>{
  //   orders.aggregate([
  //     {$match:
  //       {
  //         $expr:{
  //           $and:[
  //             { $eq:[ '$financial_year', fYear]},  
  //             { $eq:[{ $dateToString: { format: '%Y-%m-%d', date: '$order_date' } }, req.query.order_date]}
  //           ]
  //         }
  //       }
  //     },
  //     {$lookup:{
  //       from: 'transactiondetails',
  //       as: 'orders.details',
  //       let: { parent_id: '$orders._id' },
  //       pipeline: [
  //         {$match: {$or: [
  //           { financial_year: fYear },
  //           { financial_year: { $exists: false } }
  //         ]}},
  //         {
  //           $match: {
  //             $expr: {
  //               $and: [
  //                 { $eq: ['$parent_id', '$$parent_id'] },
  //                 { $eq: ['$is_active','YES']},
  //                 { $eq: ['$is_delete','NO']}
  //               ]
  //             }
  //           }
  //         }
  //       ]
  //     }},
  //   ]).exec((err, ordersList) => {
  //     if(!err){
  //       resolve(ordersList);
  //     }else{
  //       reject(err);
  //     }
  //   });
  // });

  // Promise.all([customerPromise,ordersPromise]).then((results)=>{
  //   res.json(results);
  // })
  // ___________________
    var customerMatchArr = [{"is_active":"YES"}];
    const fYear = common.getFinancialYear(req.query.order_date);
    var orderMatchArr = [
      { $eq: ['$customer_id', '$$cust_id'] },
      { $eq: ['$local_date',req.query.order_date]},
      { $eq: ['$is_delivered', 'NO']},
      { $eq: ['$is_active', 'YES']},
      { $eq: ['$is_delete', 'NO']},
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
              {$match: {
                financial_year: fYear
              }},
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
            let: { parent_id: '$orders._id',search_date: '$orders.order_date' },
            pipeline: [
              {$match: {$or: [
                { financial_year: fYear },
                { financial_year: { $exists: false } }
              ]}},
              {
                $match: {
                  $and: [
                    { $expr: { $eq: ["$parent_id", "$$parent_id"] } },
                    { $expr: { $eq: ["$parent_date", "$$search_date"] } },
                    { is_active: "YES" },
                    { is_delete: "NO" }
                  ]
                  // parent_id: '{{$$parent_id}}',
                  // 'parent_id':'$$parent_id',
                  // '$parent_date': '$$search_date'
                  // $expr: {
                  //   $and: [
                  //     { $eq: ['$parent_id', '$$parent_id'] },
                  //     { $eq: ['$is_active','YES']},
                  //     { $eq: ['$is_delete','NO']},
                  //     { $eq: [{$dateToString: {format: "%Y-%m-%d", date: "$parent_date", timezone: "+05:30"}}, '$$search_date']}
                  //   ]
                  // }
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
            as: '_id.customer',
          }},
        {"$unwind":{
            path: '$_id.customer',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
          }},
        {"$lookup":{
          from: 'routes',
          localField: '_id.customer.route',
          foreignField: '_id',
          as: '_id.customer.routes'          
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
  const fYear = common.getFinancialYear(req.query.order_date);
  var consMatchArr = {
    'is_active':'YES',
    'is_delete':'NO',
    'is_delivered':'NO',
    'local_date':req.query.order_date,
    //'customers.route': ObjectId(req.query.route)
  };

  if(req.query.route && req.query.route != 'all'){
    consMatchArr['customers.route']=ObjectId(req.query.route);
  }

  orders.aggregate([
    {"$match":{
      financial_year: fYear
    }},
    // customer required due to split up route wise
    {"$lookup":{
      from: 'customers',
      localField: 'customer_id',
      foreignField: '_id',
      as: 'customers'
    }},
    {"$unwind":{
      path: '$customers',
      //includeArrayIndex: 'string',
      preserveNullAndEmptyArrays: true
    }},
    {"$addFields":{
      'local_date': { "$dateToString": { format: "%Y-%m-%d", date: "$order_date", timezone: "+05:30" } }
    }},
    {"$match":consMatchArr},
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
            },
            $or: [
                { financial_year: fYear },
                { financial_year: { $exists: false } }
            ]
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