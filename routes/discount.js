const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');

const discount = require('../models/discount');
const discounttransaction = require('../models/discounttransaction');

var genResp = function() {
    return {
        code : 201,
        message : "Error Occurred",
        data: []
    };
}

router.get('/getDiscountTrans',(req,res,next)=>{
    console.log(req.query);
    let _resp = genResp();
    discounttransaction.aggregate([
        {"$addFields":{
            discountDate: {$dateToString:{format:"%Y-%m-%d",date:"$createdAt",timezone:"+05:30"}}
          }},
        {"$match":{
            discountDate:req.query.pdate,
            is_active: "YES",
            is_delete:"NO"
          }},
        {"$lookup":{
            from: 'discounts',
            localField: 'discount_id',
            foreignField: '_id',
            as: 'discounts'
          }},
        {"$unwind":{
            path: '$discounts',
            //includeArrayIndex: 'string',
            preserveNullAndEmptyArrays: true
          }},
        {"$lookup":{
            from: 'products',
            localField: 'prod_id',
            foreignField: 'product_id',
            as: 'products'
          }},
        {"$unwind":{
            path: '$products',
            //includeArrayIndex: 'string',
            preserveNullAndEmptyArrays: true
          }}
    ]).exec((err,list)=>{
        if(!err){
            _resp.code = 200;
            _resp.message = "success!!";
            _resp.data = list;
            res.json(_resp);
        }else{
            _resp.data = err;
            res.json(_resp);
        }
    });
});

router.getDiscounts = function(req){
    return new Promise(function(resolve,reject){
    let query = [
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
            "from": "products",
            "localField": "buy_prod_id",
            "foreignField": "_id",
            "as": "buy_product"
        }},
        {    
        "$lookup": {
            "from": "products",
            "localField": "free_prod_id",
            "foreignField": "_id",
            "as": "free_product"
        }}
    ];
    
    if(req && req.query && req.query.isactive){
        query.push({"$match":{"is_active":req.query.isactive}});
    }

    if(req && req.query.cur_date){
        query.push({"$addFields":{
            'f_date': { "$dateToString": { format: "%Y-%m-%d", date: "$from_date", timezone: "+05:30" } },
            't_date': { "$dateToString": { format: "%Y-%m-%d", date: "$to_date", timezone: "+05:30" } }
        }});
        query.push({"$match":{
            f_date:{$lte:req.query.cur_date},
            t_date:{$gte:req.query.cur_date}
        }});
    }

    discount.aggregate(query).exec((err,list)=>{
        if(err){
            //res.json(err);
            reject(err);
        }else{            
            //res.json(list);
            //console.log(list);
            resolve(list);
        }
    });
    });
}

router.get('/list',(req,res,next)=>{
    router.getDiscounts(req).then(result =>{
        res.json(result);
    })
    // let query = [
    //     {    
    //     "$lookup": {
    //         "from": "users",
    //         "localField": "createdBy",
    //         "foreignField": "_id",
    //         "as": "createdUser"
    //     }},
    //     {    
    //     "$lookup": {
    //         "from": "users",
    //         "localField": "updatedBy",
    //         "foreignField": "_id",
    //         "as": "updatedUser"
    //     }},
    //     {    
    //     "$lookup": {
    //         "from": "products",
    //         "localField": "buy_prod_id",
    //         "foreignField": "_id",
    //         "as": "buy_product"
    //     }},
    //     {    
    //     "$lookup": {
    //         "from": "products",
    //         "localField": "free_prod_id",
    //         "foreignField": "_id",
    //         "as": "free_product"
    //     }}
    // ];
    
    // if(req.query && req.query.isactive){
    //     query.push({"$match":{"is_active":req.query.isactive}});
    // }

    // if(req.query.cur_date){
    //     query.push({"$addFields":{
    //         'f_date': { "$dateToString": { format: "%Y-%m-%d", date: "$from_date", timezone: "+05:30" } },
    //         't_date': { "$dateToString": { format: "%Y-%m-%d", date: "$to_date", timezone: "+05:30" } }
    //     }});
    //     query.push({"$match":{
    //         f_date:{$lte:req.query.cur_date},
    //         t_date:{$gte:req.query.cur_date}
    //     }});
    // }

    // discount.aggregate(query).exec((err,list)=>{
    //     if(err){
    //         res.json(err);
    //     }else{
    //         res.json(list);
    //     }
    // });
});
    
router.post('/create',(req,res,next)=>{
    
    let newDiscount = new discount(req.body);

    newDiscount.save((err,discount)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'discount added successfully'});
        }
    });
});

router.put('/update/:id',(req,res,next)=>{

    discount.findByIdAndUpdate(req.params.id, {$set: req.body},(err,discount)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'discount updated successfully'});
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    discount.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});



module.exports = router;