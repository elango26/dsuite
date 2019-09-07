const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');
const orders = require('../models/order');
const transactionDetails = require('../models/transactiondetails');

router.get('/searchOrders',(req,res,next)=>{
    orders.aggregate([
        {
            $project:{
                customer_id: '$customer_id',
                yearMonthDayUTC: { "$dateToString": { format: "%Y-%m-%d", date: "$order_date", timezone: "+05:30" } }
            }
        },
        {
            $lookup:{
                from: 'transactiondetails',
                localField: '_id',
                foreignField: 'parent_id',
                as: 'details'
            }
        },
        {
            $match:{
                yearMonthDayUTC: req.query.searchDate,
                customer_id:ObjectId(req.query.id)
            }
        }
    ]).exec((err,list) => {
        //'2019-09-03'
        if(!err){
            res.json(list);
        }else{
            res.json("err"+err);
        }
    });    
});

router.get('/list',(req,res,next)=>{
    
    orders.aggregate([
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
                            "$match": { parent_id: ObjectId(list[i]._id) }
                        },
                        {    
                        "$lookup": {
                            "from": "products",
                            "localField": "prod_id",
                            "foreignField": "_id",
                            "as": "product"
                        }},
                        {    
                        "$lookup": {
                            "from": "discounts",
                            "localField": "prod_discount_id",
                            "foreignField": "_id",
                            "as": "discount"
                        }}
                    ]).exec((err,detail)=>{                        
                        if(!err) list[processedCount].details = detail;
                        result.push(list[processedCount]);
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
    // if(req.body._id)
    //     req.body._id = ObjectId(req.body._id);

    let newOrders = new orders(req.body);
    if(req.body._id)
        newOrders.isNew = false;
    //     req.body._id = ObjectId(req.body._id);
    

    newOrders.save((err,orders)=>{
        if(err){
            res.json(err);
        }else{
            if(!req.body.details || !req.body.details.length) res.json({msg:'Please enter orders'});
            let count = 0;
            //removing all trasaction details 
            if(req.body._id){
                const query = { parent_id : ObjectId(req.body._id) };

                transactionDetails.deleteMany(query)
                .then(result => console.log(`Deleted ${result.deletedCount} item(s).`))
                .catch(err => console.error(`Delete failed with error: ${err}`));
            }                
            //inserting new transactions
            for (let i = 0, len = req.body.details.length; i < len; i++) {
                req.body.details[i].parent_id = orders._id;
                req.body.details[i].type = "ORDER";                
                let newtransaction = new transactionDetails(req.body.details[i]);
                newtransaction.save((errs,transaction)=>{
                    if(errs){
                        res.json(errs); 
                    }
                    count++
                    if(count === len) res.json({msg:'Orders added successfully'});
                });
            }
        }
    });
});

router.put('/update/:id',(req,res,next)=>{

    orders.findByIdAndUpdate(req.params.id, {$set: req.body},(err,orders)=>{
        if(err){
            res.json(err);
        }else{
            transactionDetails.deleteMany({ parent_id : orders._id });
            if(!req.body.details || !req.body.details.length) res.json({msg:'Orders updated successfully'});
            let count = 0;
            for (let i = 0, len = req.body.details.length; i < len; i++) {
                req.body.details[i].parent_id = orders._id;
                req.body.details[i].type = "ORDER";
                let newtransaction = new transactionDetails(req.body.details[i]);
                newtransaction.save((errs,transaction)=>{
                    if(errs){
                        res.json(errs);
                    }
                    count++
                    if(count === len) res.json({msg:'Order updated successfully'});
                });
            }
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    
    orders.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            transactionDetails.deleteMany({ parent_id : req.params.id });
            res.json(result);
        }
    });
});



module.exports = router;