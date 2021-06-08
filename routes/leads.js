const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');
const sales = require('../models/sales');
//const transactionDetails = require('../models/transactiondetails');
const customer = require('../models/customer');
const payments = require('../models/payments');

router.get('/list',(req,res,next)=>{
  var customerMatchArr = [{"is_active":"YES"}];
  if(req.query.route != 'all'){
    customerMatchArr.push({"route":ObjectId(req.query.route)}); 
  }
    customer.aggregate([
      {"$match":{
        "$and": customerMatchArr
      }},
        {
        "$lookup": {
            "from": "users",
            "localField": "createdBy",
            "foreignField": "_id",
            "as": "createdUser"
        }},
        {    
        "$lookup": {
            "from": "users",
            "localField": "updatedBy",
            "foreignField": "_id",
            "as": "updatedUser"
        }},
        {    
        "$lookup": {
            "from": "routes",
            "localField": "route",
            "foreignField": "_id",
            "as": "routes"
        }},
        {    
        "$lookup": {
            "from": "sales",
            "let": {"cus_id":"$_id"},
            "as": "sales",
            "pipeline" : [{
              $match:{
                $expr: {
                $and:[
                  {$eq:['$customer_id','$$cus_id']},
                  {$eq:['$is_active','YES']},
                  {$eq:['$is_delete','NO']},
                  {$eq:['$payment_type','CREDIT']}
                  ]
                }
              }
            }]
        }},
        { "$unwind": {
            path: '$sales',
            //includeArrayIndex: 'sales',
            preserveNullAndEmptyArrays: true
          }},
        {
            "$group": {
                "_id": "$_id",                            
                "debit": { $sum: "$sales.total_amount" },
                "debit_count": { $sum: 1 },
                "customer":{
                    $push:"$$ROOT"
                }            
            }
        },
        {
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$customer", 0 ] }, "$$ROOT" ] } }
        },
        { $project: { customer: 0, sales: 0 } },
        {    
        "$lookup": {
            "from": "payments",
            "let": {"customer_id":"$_id"},
            "as": "payments",
            "pipeline":[
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$customer_id', '$$customer_id'] },
                      { $eq: ['$is_active', 'YES']},
                      { $eq: ['$is_delete', 'NO']}
                    ]
                  }
                }
              }
            ]
        }},
        { "$unwind": {
            path: '$payments',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
        }},
        {
            "$group": {
                "_id": "$_id",                            
                "credit": { $sum: "$payments.amount" },
                "credit_count": { $sum: 1 },
                "customer": {
                    $push: '$$ROOT'
                }
            }
        },
        {
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$customer", 0 ] }, "$$ROOT" ] } }
        },
        { $project: { customer: 0, payments: 0 } },
        {    
        "$lookup": {
            "from": "openingbalances",
            "localField": "_id",
            "foreignField": "customer_id",
            "as": "obs"
        }},
        { "$unwind": {
            path: '$obs',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
        }},
        {
            "$group": {
                "_id": "$_id",                            
                "openingbalance": { $sum: "$obs.amount" },
                "openingbalance_count": { $sum: 1 },
                "customer": {
                    $push: '$$ROOT'
                }
            }
        },
        {
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$customer", 0 ] }, "$$ROOT" ] } }
        },
        { $project: { customer: 0, payments: 0, obs: 0  } },
        {"$sort":{
            "route": 1,
            "index": 1
        }}
    ]).exec((err,leads)=>{
        if(err){
            res.json(err);
        }else{
            res.json(leads);
        }
    });   
});

router.get('/getTransactions',(req,res,next)=>{
    var _resp = {
        code : 201,
        message : "Error!!",
        data: []
    };
    var today = new Date();
    var limit = new Date(today.setDate(today.getDate() - 10));
    var salesAgg = [
        {"$match":{
          sale_date : {$gte: limit}
        }},
        {"$addFields":{
            localDate: {$dateToString:{format:'%Y-%m-%d',date:'$createdAt',timezone:'+05:30'}}
        }},
        {"$group":{
            _id: {date:'$localDate',customer:'$customer_id'},
            debit: {
              $sum: '$total_amount'
            },
            sale_ids:{
              $push:'$sale_id'
            }
        }}
    ];

    if(req.query.customer_id && req.query.customer_id !=""){
        salesAgg.unshift({"$match":{
            customer_id:ObjectId(req.query.customer_id),
            is_active: 'YES',
            is_delete: 'NO',
            payment_type: 'CREDIT'
          }});
    }
    sales.aggregate(salesAgg).exec((err,debits)=>{
        if(err){
            _resp.data = err;           
            res.json(_resp);
        }else{
            var payAgg = [
                {"$match":{
                  createdAt: {$gte: limit},
                  is_active: 'YES',
                  is_delete: 'NO',
                }},
                {"$addFields":{
                    localDate: {$dateToString:{format:'%Y-%m-%d',date:'$createdAt',timezone:'+05:30'}}
                }},
                {"$group":{
                    _id: {date:'$localDate',customer:'$customer_id'},
                    credit: {
                      $sum: '$amount'
                    }
                }}
            ];
            if(req.query.customer_id && req.query.customer_id !=""){
                payAgg.unshift({"$match":{
                    customer_id:ObjectId(req.query.customer_id)
                  }});
            }
            payments.aggregate(payAgg).exec((err,credits)=>{
                if(err){
                    _resp.data = err;                    
                    res.json(_resp);
                }else{     
                    var totalArray = credits.concat(debits);
                    // totalArray.sort(function(a,b){
                    //     var key1 = new Date(a._id.date);
                    //     var key2 = new Date(b._id.date);

                    //     if (key1 < key2) {
                    //         return -1;
                    //     } else if (key1 == key2) {
                    //         return 0;
                    //     } else {
                    //         return 1;
                    //     }
                    // });

                    totalArray.sort(function(a,b){
                        return new Date(a._id.date)-new Date(b._id.date);
                    })
                    
                    _resp.data = totalArray.reverse();
                    _resp.code = 200;
                    _resp.message = "Data Loaded!";                   
                    res.json(_resp);
                }
            });
        }
    })
});

router.get('/sales_report',(req,res,next)=>{
    var customerMatchArr = [{"is_active":"YES"}];
    var orderMatchArr = [
      { $eq: ['$customer_id', '$$cust_id'] },
      { $eq: ['$local_date',req.query.sale_date]},
      { $eq: ['$is_active', 'YES']},
      { $eq: ['$is_delete', 'NO']},
      //{ $eq: ['$is_delivered', 'YES']},
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
            from: 'sales',
            as: 'sales',
            let: { cust_id: '$_id' },
            pipeline: [
              {
                $addFields:{
                    'local_date': { "$dateToString": { format: "%Y-%m-%d", date: "$sale_date", timezone: "+05:30" } }
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
            path: '$sales',
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
            as: 'sales.details',
            let: { parent_id: '$sales._id' },
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
            path: '$sales.details',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
          }},
        {"$lookup":{
            from: 'products',
            localField: 'sales.details.prod_id',
            foreignField: '_id',
            as: 'sales.details.products'
          }},
        {"$unwind":{
            path: '$sales.details.products',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
          }},
        {"$group":{
            _id: {customer:'$_id',sales:'$sales._id'},
            //orders: {$push:'$orders._id'},

            details: {
              $push:'$sales.details'
            },
            sales: {
              $sum:'$sales.total_amount'
            }
          }},
        {"$lookup":{
            from: 'sales',
            localField: '_id.sales',
            foreignField: '_id',
            as: '_id.sales'
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
            path: '$_id.sales',
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

router.get('/lead_report',(req,res,next)=>{
  var _resp = {
    code : 201,
    message : "Error!!",
    data: []
  };
  var arr = [];
  let dat1 = new Date();
  dat1.setDate(dat1.getDate() - 8);
  arr.push(dat1);
  let dat2 = new Date();
  dat2.setDate(dat2.getDate() - 1);
  arr.push(dat2);
  let dat3 = new Date();
  arr.push(dat3);
  
  customer.aggregate([
    {"$lookup":{
      from: 'sales',
      as: 'sales',
      let: { cust_id: '$_id' },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ['$customer_id', '$$cust_id'] },
                { $eq: ['$is_active','YES']},
                { $eq: ['$is_delete','NO']}
              ]
            }
          }
        }
      ]
    }},
      // {"$lookup":{
      //   from: 'sales',
      //   localField: '_id',
      //   foreignField: 'customer_id',
      //   as: 'sales'
      // }},
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
                  ],
                  "default": "today"
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
            as: 'payments',
            let: { cust_id: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$customer_id', '$$cust_id'] },
                      { $eq: ['$is_active','YES']},
                      { $eq: ['$is_delete','NO']}
                    ]
                  }
                }
              }
            ]
          }},           
          // {"$lookup":{
          //   from: 'payments',
          //   localField: '_id',
          //   foreignField: 'customer_id',
          //   as: 'payments'
          // }},           
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
                      ],
                      "default": "today"
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
            customer.aggregate([
              {"$lookup":{
                from: 'openingbalances',
                let: {cust_id:'$_id'},
                as: 'openings',
                pipeline:[
                  {$match:{
                    $expr:{
                      $and:[
                       {$eq:['$customer_id','$$cust_id']},
                       {$eq:['$is_active','YES']},
                       {$eq:['$is_delete','NO']}
                      ]
                    }
                  }}
                ]
              }},
              {"$unwind":{
                path: '$openings',
                //includeArrayIndex: '<<string>>',
                preserveNullAndEmptyArrays: true
              }},
              {"$group":{
                _id: '$_id',
                openings: {
                  $sum: '$openings.amount'
                }
              }}
            ]).exec((err,openings)=>{
              if(!err){   
                var openings_arr = {};          
                if(openings.length > 0){
                  for(let i=0;i<openings.length;i++){
                    if(!openings_arr[openings[i]._id])
                      openings_arr[openings[i]._id] = {};
                    openings_arr[openings[i]._id]['opening'] = openings[i].openings;                
                  }
                }

                var sales_arr = {};          
                if(result.length > 0){
                  for(let i=0;i<result.length;i++){
                    if(!sales_arr[result[i]._id.customer])
                      sales_arr[result[i]._id.customer] = {};
                    sales_arr[result[i]._id.customer][result[i]._id.dte] = result[i].sales;                
                  }
                }

                var paid_arr = {}; 
                if(payments.length > 0){
                  for(let i=0;i<payments.length;i++){
                    if(!paid_arr[payments[i]._id.customer])
                      paid_arr[payments[i]._id.customer] = {};
                    paid_arr[payments[i]._id.customer][payments[i]._id.dte] = payments[i].paid;                
                  }                
                }
                let response = {
                  'sales': sales_arr,
                  'payments': paid_arr,
                  'openings': openings_arr
                }
                _resp.data = response;
                _resp.code = 200;
                _resp.message = "Success";
                res.json(_resp);
              }else{
                _resp.data = err;
                res.json(_resp);
              }
            });
          }else{
            _resp.data = err;
            res.json(_resp);
          }
        });
      }else{
        _resp.data = err;
        res.json(_resp);
      }
  })
});

// router.get('/getSalesTransactions',(req,res,next)=>{
//   var _resp = {
//     code : 201,
//     message : "Error!!",
//     data: []
//   };

//   customer.aggregate([
//     {"$match":{
//       _id: ObjectId(req.query.customer_id)
//       //_id: ObjectId('5fa2cbb1a9f5d65772c24de2')
//       //_id: ObjectId('6072e46335442275006b77b8')
//     }},
//     {"$lookup":{
//       from: 'sales',
//       let: {customer_id: '$_id'},
//       as: 'sales',
//       pipeline: [
//         {
//           $addFields: {
//             s_date: { "$dateToString": { format: "%Y-%m-%d", date: "$sale_date", timezone: "+05:30" } }
//           }
//         },
//         {
//           $match: {
//             $expr: {
//               $and: [
//                 { $eq: ['$customer_id', '$$customer_id'] },
//                 { $eq: ['$is_active','YES']},
//                 { $eq: ['$is_delete','NO']},
//                 { $eq: ['$payment_type','CREDIT']}
//               ]
//             }
//           }
//         }
//       ]
//     }},
//     {"$unwind":{
//       path: '$sales',
//       includeArrayIndex: 'index',
//       //preserveNullAndEmptyArrays: boolean
//     }},
//     {"$group":{
//       _id: '$_id',
//       customer : { $first: "$customerName" },
//       total_payments: {
//         $sum: {
//             $cond:[
//                 {"$and":[
//                     {"$lt": [ "$sales.s_date", req.query.fromDate ]},
//                     //{"$eq": [ "$trans.createdDate", req.query.q_date]}
//                 ]},
//             '$sales.total_amount',
//             false
//             ]
//         } 
//       },
//       items: {
//         //$push: {date: "$sales.s_date",index: "$index"}
//         $push: {
//           $cond:[
//             {"$and":[
//               {"$gte": [ "$sales.s_date", req.query.fromDate ]},
//               //{"$eq": [ "$trans.createdDate", req.query.q_date]}
//             ]},
//             {date: "$sales.s_date",index: "$index"},
//             false
//             //"$$REMOVE"
//           ]
//         }
//       },
//       values: { 
//         //$push: "$sales.total_amount" 
//         $push: {
//           $cond:[
//             {"$and":[
//               {"$gte": [ "$sales.s_date", req.query.fromDate ]},
//               //{"$eq": [ "$trans.createdDate", req.query.q_date]}
//             ]},
//             //{amount: "$sales.total_amount",index: "$index"},
//             "$sales.total_amount",
//             false
//             //"$$REMOVE"
//           ]
//         }
//       }
//     }},
//     {"$addFields":{
//       result: {
//         $map: {
//             input: "$items",
//             as: "item",
//             in: { 
//               date: "$$item.date", 
//               //credit: {$add: [1, "$$item.index"]},
//               credit: { $sum: { $slice: [ "$values", "$$item.index",1 ] } } ,
//               tot_amount: { $sum: { $slice: [ "$values", { $add: [1, "$$item.index"] } ] } }
//             }
//         }
//       }
//     }},
//     {"$project":{
//       items:0,
//       values:0
//     }}
//   ]).exec((res,err)=>{
//     if(!err){
//       _resp.code = 200;
//       _resp.data = res;
//       res.json(_resp);
//     }
//   });
// });

// router.get('/getCustTransactions_old',(req,res,next)=>{
//   var _resp = {
//     code : 201,
//     message : "Error!!",
//     data: []
//   };

//   customer.aggregate([
//     {"$match":{
//       _id: ObjectId('5fa2cbb1a9f5d65772c24de2')
//     }},
//     {"$lookup":{
//       from: 'sales',
//       let: {customer_id: '$_id'},
//       as: 'sales',
//       pipeline: [
//         {
//           $addFields: {
//             s_date: { "$dateToString": { format: "%Y-%m-%d", date: "$sale_date", timezone: "+05:30" } }
//           }
//         },
//         {
//           $match: {
//             $expr: {
//               $and: [
//                 { $eq: ['$customer_id', '$$customer_id'] },
//                 { $eq: ['$is_active','YES']},
//                 { $eq: ['$is_delete','NO']},
//                 { $eq: ['$payment_type','CREDIT']}
//               ]
//             }
//           }
//         }
//       ]
//     }},
//     {"$lookup":{
//       from: 'payments',
//       as: 'payments',
//       let: {customer_id: '$_id'},
//       pipeline: [
//         {
//           $addFields: {
//             s_date: { "$dateToString": { format: "%Y-%m-%d", date: "$createdAt", timezone: "+05:30" } }
//           }
//         },
//         {
//           $match: {
//             $expr: {
//               $and: [
//                 { $eq: ['$customer_id', '$$customer_id'] },
//                 { $eq: ['$is_active','YES']},
//                 { $eq: ['$is_delete','NO']}
//               ]
//             }
//           }
//         }
//       ]
//     }},
//     {"$project":{ 
//       customerName:1,
//       trans: { 
//         $concatArrays: ["$sales", "$payments"]
//       } 
//     }},
//     {"$unwind":{
//       path: '$trans',
//       includeArrayIndex: 'index',
//       //preserveNullAndEmptyArrays: true
//     }},
//     {"$group":{
//       _id: '$_id',
//       customer : { $first: "$customerName" },
//       items: {
//         $push: {date: "$trans.s_date",index: "$index"}
//       },
//       credit: { $push: "$trans.total_amount" },
//       debit:  { $push: "$trans.amount" }
//     }},
//     {"$addFields":{
//       result: {
//         $map: {
//             input: "$items",
//             as: "item",
//             in: { 
//               date: "$$item.date", 
//               //credit: {$add: [1, "$$item.index"]},
//               debit:{ $sum: { $slice: [ "$debit", "$$item.index",1 ] } } ,
//               credit: { $sum: { $slice: [ "$credit", "$$item.index",1 ] } } ,
//               tot_cr: { $sum: { $slice: [ "$credit", { $add: [1, "$$item.index"] } ] } },
//               tot_dr: { $sum: { $slice: [ "$debit", { $add: [1, "$$item.index"] } ] } }
//             }
//         }
//       }
//     }}
//   ]).exec((res,err)=>{
//     if(!err){
//       res.json(res);
//     }
//   });
// });
module.exports = router;