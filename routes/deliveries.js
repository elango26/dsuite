const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');
const orders = require('../models/order');
const transactionDetails = require('../models/transactiondetails');
const customer = require('../models/customer');
const product = require('../models/product');
const route = require('../models/route');
const common = require('./common');

router.get('/list2',(req,res,next)=>{
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
            preserveNullAndEmptyArrays: true
          }},        
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
                }
              }
            ]
          }},
        {"$unwind":{
            path: '$orders.details',
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
            preserveNullAndEmptyArrays: true
          }},
        {"$group":{
            _id: {customer:'$_id',orders:'$orders._id'},
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

router.get('/list', async (req, res) => {
  try {
      const fYear = common.getFinancialYear(req.query.order_date);

      let customerMatchArr = [{ "is_active": "YES" }];
      if (req.query.route !== 'all') {
          customerMatchArr.push({
              "$or": req.query.route.split(',').map(routeId => ({ "route": ObjectId(routeId) }))
          });
      }
      if (req.query.search_key) {
          customerMatchArr.push({ "customerName": new RegExp(req.query.search_key, 'i') });
      }

      const customers = await customer.find({ "$and": customerMatchArr }, { _id: 1, customerName: 1, route: 1 }).sort({ route: 1, index: 1 }).populate("route");
      
      if (customers.length === 0) return res.json('empty customers');
      
      const customerIds = customers.map(c => c._id);
      
      const localDate = new Date(req.query.order_date + "T00:00:00+05:30"); // Converts '2025-03-30' to local time

      // Convert to UTC (subtract 5 hours 30 minutes)
      const startISO = new Date(localDate.getTime()); // Now in UTC
      const endISO = new Date(startISO.getTime() + 24 * 60 * 60 * 1000 - 1);

      const orderIds = await orders.find({
          customer_id: { $in: customerIds },
          order_date: { $gte: startISO, $lte: endISO },
          financial_year: fYear,
          is_delivered: "NO",
          is_active: "YES",
          is_delete: "NO"
      });
      
      // return res.json(orderIds);
      if (orderIds.length === 0) {
          const finalResult = customers.map(c => ({
          customer: c,
          orders: null
          }));
          return res.json(finalResult);
      }

      const orderIdsList = orderIds.map(o => o._id);

      const transactionDetailsRes = await transactionDetails.find({
          parent_id: { $in: orderIdsList },
          financial_year: fYear,
          is_active: "YES",
          is_delete: "NO"
      }).populate("prod_id");

      // Group transaction details by order_id
      const transactionsByOrder = transactionDetailsRes.reduce((acc, t) => {
          (acc[t.parent_id.toString()] ||= []).push(t);
          return acc;
      }, {});

      // Attach transaction details to orders
      const ordersWithDetails = orderIds.map(o => ({
          ...o.toObject(),
          details: transactionsByOrder[o._id.toString()] || []
      }));

      
      // Group orders by customer_id
      const ordersByCustomer = ordersWithDetails.reduce((acc, o) => {
          acc[o.customer_id.toString()] = o;
          return acc;
      }, {});

      // Attach orders to customers
      const finalResult = customers.map(c => ({
          customer: c,
          orders: ordersByCustomer[c._id.toString()] || null
      }));

      res.json(finalResult);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


router.get('/consolidatelist',(req,res,next)=>{
  const fYear = common.getFinancialYear(req.query.order_date);
  var consMatchArr = {
    'is_active':'YES',
    'is_delete':'NO',
    'is_delivered':'NO',
    'local_date':req.query.order_date,
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