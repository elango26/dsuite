const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');
const sales = require('../models/sales');
const transactionDetails = require('../models/transactiondetails');
const discountTransaction = require('../models/discounttransaction');
const common = require('./common');

router.get('/list',(req,res,next)=>{
    
    sales.aggregate([
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
            "as": "customerDetail"
        }},
        {"$lookup":{
            from: 'discounttransactions',
            let: {sale_id: '$sale_id'},
            as: 'discount',
            pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ['$sale_id', '$$sale_id'] },
                        { $eq: ['$is_active', 'YES']},
                        { $eq: ['$is_delete', 'NO']}
                      ]
                    }
                  }
                }
            ]
        }}
    ]).exec((err,list)=>{
        if(err){
            res.json(err);
        }else{
            let result = [];
            if(list && list.length){
                let processedCount = 0;
                for (let i = 0, len = list.length; i < len; i++) {

                    transactionDetails.aggregate([
                        {
                            "$match": { parent_id: ObjectId(list[i]._id),is_active: 'YES', is_delete: 'NO' }
                        },
                        {    
                        "$lookup": {
                            "from": "products",
                            "localField": "prod_id",
                            "foreignField": "_id",
                            "as": "product"
                        }},
                        // {    
                        // "$lookup": {
                        //     "from": "discounts",
                        //     "localField": "prod_discount_id",
                        //     "foreignField": "_id",
                        //     "as": "discount"
                        // }}
                    ]).exec((err,detail)=>{                        
                        if(!err) list[i].details = detail;
                        result.push(list[i]);
                        processedCount++;
                        if(processedCount === len){
                            res.json(result);
                        } 
                    }); 
                }
            }
        }
    });
});
    
router.post('/create',(req,res,next)=>{
    
    if(req.body.createdBy) req.body.createdBy = {_id: ObjectId(req.body.createdBy)}
    sales.countDocuments(function(err, count) {
        if(!err){    
            req.body['sale_id'] = common.padding(count+1,7,'POS');
            let newSales = new sales(req.body);

            newSales.save((err,sales)=>{
                if(err){
                    res.json(err);
                }else{
                    if(req.body.discounts && req.body.discounts.length > 0){
                        for(let key in req.body.discounts){
                            req.body.discounts[key].sale_id = sales.sale_id;                            
                        }   
                        let insertDisc = discountTransaction.insertMany(req.body.discounts);
                        console.log(insertDisc+'success');
                    }
                    if(!req.body.details || !req.body.details.length) res.json({msg:'sales updated successfully'});
                    let count = 0;
                    for (let i = 0, len = req.body.details.length; i < len; i++) {
                        req.body.details[i].parent_id = sales._id;
                        req.body.details[i].type = "SALES";
                        let newtransaction = new transactionDetails(req.body.details[i]);
                        newtransaction.save((errs,transaction)=>{
                            if(errs){
                                res.json(errs); 
                            }
                            count++
                            if(count === len) {
                                let resp = {
                                    code : 200,
                                    message : "sales added successfully",
                                    data: sales
                                }
                                res.json(resp);
                            };
                        });
                    }
                    //discount table
                }
            });
        }else{
            let resp = {
                code : 201,
                message : "Error in count:: Sales",
                data: {}
            }
            res.json(resp);
        }
    });
});

router.put('/delete/:id',(req,res,next)=>{
    let _resp = {
        code : 201,
        message : "Error Occurred",
        data: []
    };
    sales.findByIdAndUpdate(req.params.id, {$set: {'is_delete':'YES'}},(err,sales)=>{
        if(!err){
            transactionDetails.updateMany({parent_id:ObjectId(req.params.id)},{$set:{'is_delete':'YES'}});                
            _resp.code = 200;
            _resp.message = "Successfully deleted!!";
            res.json(_resp);               
        }else{
            _resp.data = err;
            res.json(_resp);
        }
    });
});

router.put('/update/:id',(req,res,next)=>{
    let _resp = {
        code : 201,
        message : "Error Occurred",
        data: []
    };
    sales.findByIdAndUpdate(req.params.id, {$set: req.body},(err,sales)=>{
        if(err){
            _resp.message = err;
            res.json(_resp);
        }else{
            //transactionDetails.deleteMany({ parent_id : sales._id, type: 'SALES' });
            if(req.body.discounts.length > 0){
                for(let key in req.body.discounts){
                    req.body.discounts[key].sale_id = sales.sale_id;
                    let newDist = new discountTransaction(req.body.discounts[key]);
                    if(req.body.discounts[key]._id)
                        newDist.isNew = false;
                    newDist.save((errs,discount)=>{
                        if(errs)
                            console.log('error while saving discount trans'+errs);
                    });
                }
            }
            if(!req.body.details || !req.body.details.length) {
                _resp.code = 200;
                _resp.message = "No transactions found";
                res.json(_resp);
            }
            let count = 0;
            for (let i = 0, len = req.body.details.length; i < len; i++) {                
                req.body.details[i].parent_id = sales._id;
                req.body.details[i].type = "SALES";
                let newtransaction = new transactionDetails(req.body.details[i]);
                if(req.body.details[i]._id)
                    newtransaction.isNew = false;
                newtransaction.save((errs,transaction)=>{
                    if(errs){
                        _resp.code = 201;
                        _resp.message = "Error in updating transaction";
                        res.json(_resp);
                    }
                    count++
                    if(count === len) {
                        _resp.code = 200;
                        _resp.message = "Sales updated successfully";
                        res.json(_resp);
                    }
                });
            }
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    
    sales.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            transactionDetails.deleteMany({ parent_id : req.params.id });
            res.json(result);
        }
    });
});



module.exports = router;