const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');

const rate = require('../models/rate');
const product = require('../models/product');

router.get('/list',(req,res,next)=>{
    
    rate.aggregate([
        { "$not" : { type : "custom" } },
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
            "localField": "prod_id",
            "foreignField": "_id",
            "as": "product"
        }}
    ]).exec((err,list)=>{
        if(err){
            res.json(err);
        }else{

            let result = {};
            if(list && list.length){
                for (let i = 0, len = list.length; i < len; i++) {
                    if(!result[list[i].prod_id]) result[list[i].prod_id] = {};
                    if(!result[list[i].prod_id].product) result[list[i].prod_id].product = list[i].product[0];
                    if(!result[list[i].prod_id][list[i].type]) {
                        result[list[i].prod_id][list[i].type] = {
                            id : list[i]._id,
                            price : list[i].price,
                            tax : list[i].tax
                        }
                    }
                }
            }
            res.json(result);
        }
    });
});

router.get('/products',(req,res,next)=>{

    let productIds = rate.distinct( "prod_id" );
    product.find( { _id: { $nin: productIds } },(err,list)=>{
        if(err){
            res.json(err);
        }else{
            res.json(list);
        }
    });
});
    
router.post('/create',(req,res,next)=>{
        
    let rows = [];
    req.body.rates.forEach(element => {
        element.rate.forEach(elem =>{
            if(elem.price){
                rows.push({
                    prod_id : element.prod_id,
                    type : elem.type,
                    price : elem.price,
                    tax : elem.tax,
                    createdBy : req.body.createdBy
                });
            }
        });
    });

    rate.collection.insert(rows,(err,rate)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'rate added successfully'});
        }
    });
});

router.put('/update/:id',(req,res,next)=>{

    rate.findByIdAndUpdate(req.params.id, {$set: req.body},(err,rate)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'rate updated successfully'});
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    
    rate.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});



module.exports = router;