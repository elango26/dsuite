const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');

const payment = require('../models/payments');
const sales = require('../models/sales');
const common = require('./common');
const customer = require('../models/customer');
const { response } = require('express');

var genResp = function() {
    return {
        code : 201,
        message : "Error Occurred",
        data: []
    };
}

router.get('/detailed-payment',(req,res,next)=>{
    //console.log(req.query)
    const fYear = common.getFinancialYear(req.query.fdate);
    let _resp = genResp();
    customer.aggregate([
        {"$lookup":{
            from: 'routes',
            localField: 'route',
            foreignField: '_id',
            as: 'routes'
          }},
        {"$unwind":{
            path: '$routes',
            //includeArrayIndex: 'string',
            preserveNullAndEmptyArrays: true
          }},
        {"$lookup":{
            from: 'payments',
            let: {'cust_id':'$_id'},
            as: 'payments',
            pipeline:[{
                $addFields:{
                    'createdDate' : {$dateToString:{format:'%Y-%m-%d',date:'$createdAt',timezone:'+05:30'}}
                }},
                {$match:{
                    $expr:{
                        $and:[
                            {$gte:['$financial_year',fYear]},
                            {$eq:['$customer_id','$$cust_id']},
                            {$eq:['$is_active','YES']},
                            {$eq:['$is_delete','NO']},
                            {$lte:['$createdDate',req.query.tdate]},
                            {$gte:['$createdDate',req.query.fdate]}
                        ]
                    }
                }
            }]
          }},
        {"$unwind":{
            path: '$payments',
            //includeArrayIndex: 'string',
            preserveNullAndEmptyArrays: true
          }},
        {"$lookup":{
            from: 'users',
            localField: 'payments.createdBy',
            foreignField: '_id',
            as: 'payments.users'
          }},
        {"$unwind":{
            path: '$payments.users',
            //includeArrayIndex: 'string',
            preserveNullAndEmptyArrays: true
          }},
        {"$group":{
            _id: {'route':'$routes._id','pdate':'$payments.createdDate'},
            'routename':{
              $addToSet: '$routes.areaName'
            },
            amount: {
              $sum: '$payments.amount'
            },
            paymentss:{
              $push: '$payments'
            }
          }}
    ]).exec((err,list) => {
        if(err){
            _resp.code = 201;
            _resp.message = "Error!";
            _resp.data = err;
            res.json(_resp);
        } else {
            _resp.code = 200;
            _resp.message = "Success!!";
            _resp.data = list;
            res.json(_resp);
        }
    });
});

router.get('/getOutstanding',(req,res,next)=>{
    let _resp = genResp();
    const fYear = common.getFinancialYear();
    customer.aggregate([
        {"$match":{
            '_id': ObjectId(req.query.cust_id),
            'is_active':'YES',
            'is_delete': 'NO'
        }},
        {"$lookup":{
            from: 'sales',
            let: {'cust_id':'$_id'},
            as: 'sales',
            pipeline: [
              {$addFields:{
                'createdDate' : {$dateToString:{format:'%Y-%m-%d',date:'$createdAt',timezone:'+05:30'}}
              }},
              {$match:{
                  $expr:{
                      $and:[
                          {$eq:['$financial_year',fYear]},
                          {$eq:['$customer_id','$$cust_id']},
                          {$eq:['$is_active','YES']},
                          {$eq:['$is_delete','NO']},
                          {$eq:['$payment_type','CREDIT']}
                          //{$lte:['$createdDate','$$q_date']}
                      ]
                  }
              }}
            ]
        }},
        {"$lookup":{
            from: 'payments',
            let: {'cust_id':'$_id'},
            as: 'payments',
            pipeline: [
              {$addFields:{
                'createdDate' : {$dateToString:{format:'%Y-%m-%d',date:'$createdAt',timezone:'+05:30'}}
              }},
              {$match:{
                  $expr:{
                      $and:[
                          {$eq:['$financial_year',fYear]},
                          {$eq:['$customer_id','$$cust_id']},
                          {$eq:['$is_active','YES']},
                          {$eq:['$is_delete','NO']},
                          //{$lte:['$createdDate','$$q_date']}
                      ]
                  }
              }}
            ]
        }},
        {"$lookup":{
            from: 'openingbalances',
            let: {'cust_id':'$_id'},
            as: 'ob',
            pipeline: [
              {$addFields:{
                'createdDate' : {$dateToString:{format:'%Y-%m-%d',date:'$createdAt',timezone:'+05:30'}}
              }},
              {$match:{
                  $expr:{
                      $and:[
                          {$eq:['$financial_year',fYear]},
                          {$eq:['$customer_id','$$cust_id']},
                          {$eq:['$is_active','YES']},
                          {$eq:['$is_delete','NO']},
                          //{$lte:['$createdDate','$$q_date']}
                      ]
                  }
              }}
            ]
        }}
    ]).exec((err,list)=>{
        if(!err){
            let sale = pay = ob = 0;            
            if(list && list.length > 0){
                sale = list[0].sales.reduce((sal, acc) => (sal+acc.total_amount) , 0);
                pay = list[0].payments.reduce((pays, acc) => (pays+acc.amount) , 0);
                ob = list[0].ob.reduce((bal, acc) => (bal+acc.amount) , 0);
            }
            let result = {  
                'customer_id': req.query.cust_id,
                'total_sales': (sale+ob),
                'total_payment': pay,
            }
            _resp.code = 200;
            _resp.data = result;
            _resp.message = "success";
            res.json(_resp);
        } else {
            _resp.data = err;
            res.json(_resp);
        }        
    });
    // sales.aggregate([
    //     {"$match":{
    //         customer_id: ObjectId(req.query.cust_id),
    //         is_active: 'YES',
    //         is_delete: 'NO',
    //         payment_type: 'CREDIT'
    //     }},
    //     {"$group": {
    //         _id: '$customer_id',
    //         total_sales: {
    //           $sum: '$total_amount'
    //         }
    //       }
    //     }
    // ]).exec((err,list)=>{
    //     //res.json(list);
    //     //return false;
    //     if(!err){            
    //         if(list != null){                            
    //             payment.aggregate([
    //                 {"$match":{
    //                     is_active: "YES",
    //                     is_delete: "NO"
    //                 }},
    //                 {"$group":{
    //                     _id: '$customer_id',
    //                     total_payment: {
    //                       $sum: '$amount'
    //                     }
    //                 }},
    //                 {"$match":{
    //                     _id: ObjectId(req.query.cust_id)
    //                 }}
    //             ]).exec((err,pay)=>{
    //                 if(!err){
    //                     var response = {
    //                         'customer_id': req.query.cust_id,
    //                         'total_sales': (list && list[0])?list[0].total_sales:0,
    //                         'total_payment': (pay && pay[0])?pay[0].total_payment:0,
    //                     }
    //                     res.json(response);
    //                 }else{
    //                     res.json("Error in payment fetch");
    //                 }
    //             })
    //         }            
    //     }else{
    //         res.json("Error occurred!!");
    //     }
        
    // })
});
router.get('/getOutstanding11',(req,res,next)=>{
    sales.aggregate([
        {"$match":{
            customer_id: ObjectId(req.query.cust_id),
            is_active: 'YES',
            is_delete: 'NO',
            payment_type: 'CREDIT'
        }},
        {"$group": {
            _id: '$customer_id',
            total_sales: {
              $sum: '$total_amount'
            }
          }
        }
    ]).exec((err,list)=>{
        //res.json(list);
        //return false;
        if(!err){            
            if(list != null){                            
                payment.aggregate([
                    {"$match":{
                        is_active: "YES",
                        is_delete: "NO"
                    }},
                    {"$group":{
                        _id: '$customer_id',
                        total_payment: {
                          $sum: '$amount'
                        }
                    }},
                    {"$match":{
                        _id: ObjectId(req.query.cust_id)
                    }}
                ]).exec((err,pay)=>{
                    if(!err){
                        var response = {
                            'customer_id': req.query.cust_id,
                            'total_sales': (list && list[0])?list[0].total_sales:0,
                            'total_payment': (pay && pay[0])?pay[0].total_payment:0,
                        }
                        res.json(response);
                    }else{
                        res.json("Error in payment fetch");
                    }
                })
            }            
        }else{
            res.json("Error occurred!!");
        }
        
    })
});

router.get('/list',(req,res,next)=>{ // fyear not needed since both multiple and single date match is in this method
    let aggregateArr = [
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
            "from": "customers",
            "localField": "customer_id",
            "foreignField": "_id",
            "as": "customer"
        }},
        { 
        "$sort" : { 
            "createdAt" : -1
        }},
        {"$addFields":{
            'localdate':{ "$dateToString": { format: "%Y-%m-%d", date: "$createdAt", timezone: "+05:30" } }
        }},
        {"$match":{
            "is_delete":'NO',
            "is_active":'YES'            
        }}
    ];

    if(req.query.cust_id){
        aggregateArr.push({
            "$match":{  
                //"localdate": req.query.pdate,
                "customer_id": ObjectId(req.query.cust_id)
            }
        });
    } 
    if(req.query.fdate){ //multiple date match
        aggregateArr.push({
            "$match":{  
                $expr:{
                    $and: [                        
                        // {$lte:['$localdate',new Date(req.query.tdate).toISOString()]},
                        // {$gte:['$localdate',new Date(req.query.fdate).toISOString()]}
                        {$lte:['$localdate',req.query.tdate]},
                        {$gte:['$localdate',req.query.fdate]}
                    ]
                }
            }
        });
    }else if(req.query.pdate){ //single date match
        aggregateArr.push({
            "$match":{  
                "localdate": req.query.pdate
            }
        });
    }
   
    payment.aggregate(aggregateArr).exec((err,list)=>{
        if(err){
            res.json(err);
        }else{
            res.json(list);
        }
    });
});
    
router.post('/create',(req,res,next)=>{
    payment.countDocuments(function(err, count) {
        if(!err){         
            req.body['payment_id'] = common.padding(count+1,7,'PAY');   
            let newPayment = new payment(req.body);

            newPayment.save((err,payment)=>{
                if(err){
                    res.json(err);
                }else{
                    res.json({msg:'Payment added successfully'});
                }
            });
        }else{
            res.json({msg:'Error in count:: Payment'});
        }
    });
});

router.put('/update/:id',(req,res,next)=>{
    let _resp = {
        code : 201,
        message : "Error Occurred",
        data: []
    };
    payment.findByIdAndUpdate(req.params.id, {$set: req.body},(err,payment)=>{
        if(err){
            _resp.data = err;
            res.json(_resp);
        }else{
            _resp.code = 200;
            _resp.message = "Updated Successfully!!";
            res.json(_resp);
        }
    });
});

router.put('/delete/:id',(req,res,next)=>{
    let _resp = {
        code : 201,
        message : "Error Occurred",
        data: []
    };
    payment.findByIdAndUpdate(req.params.id, {$set: {'is_delete':'YES'}},(err,payment)=>{
        if(err){
            _resp.data = err;
            res.json(_resp);
        }else{
            _resp.code = 200;
            _resp.message = "Successfully deleted!!";
            res.json(_resp);
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    payment.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});



module.exports = router;