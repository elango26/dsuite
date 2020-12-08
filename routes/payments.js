const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');

const payment = require('../models/payments');
const sales = require('../models/sales');
const common = require('./common');

router.get('/getOutstanding',(req,res,next)=>{
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

router.get('/list',(req,res,next)=>{
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
            'localdate':{ "$dateToString": { format: "%d-%m-%Y", date: "$createdAt", timezone: "+05:30" } }
        }}
    ];

    if(req.query.cust_id){
        aggregateArr.push({
            "$match":{
                customer_id: ObjectId(req.query.cust_id)
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

    payment.findByIdAndUpdate(req.params.id, {$set: req.body},(err,payment)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'Payment updated successfully'});
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