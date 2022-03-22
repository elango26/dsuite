const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');

const rate = require('../models/rate');
const product = require('../models/product');
const common = require('./common');

router.get('/rate_list',(req,res,next)=>{    
    let resp = common.getRateList();
    resp.then(function(result) {
        res.json(result);
    }, function(err){
        console.log("its error in rate js: method: rate_list");
    });
});

router.get('/list',(req,res,next)=>{
    
    rate.aggregate([
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
            let result = {}, data = [];
            if(list && list.length){
                for (let i = 0, len = list.length; i < len; i++) {

                    if(list[i].type === 'custom') continue;

                    if(!result[list[i].prod_id]) result[list[i].prod_id] = {};
                    if(!result[list[i].prod_id].product) result[list[i].prod_id].product = list[i].product[0];
                    if(!result[list[i].prod_id][list[i].type]) {
                        result[list[i].prod_id][list[i].type] = {
                            id : list[i]._id,
                            price : list[i].price,
                            tax : list[i].tax,
                            effective_date: list[i].effective_date,
                            is_active: list[i].is_active
                        }
                    }
                }
                Object.keys(result).forEach(function(key) {
                    if(result[key].product) data.push(result[key]);
                });
            }
            res.json(data);
        }
    });
});

router.get('/products',(req,res,next)=>{

    rate.aggregate([
        { "$project": { 
            "prod_id": 1
        }} 
    ]).exec((err,list)=>{
        if(err){
            res.json(err);
        }else{
            let productIds = [];
            if(list && list.length){
                for (let i = 0, len = list.length; i < len; i++) {
                    if((productIds.indexOf(list[i].prod_id)) < 0) productIds.push(list[i].prod_id);
                }
            }
            product.find( { _id: { $nin: productIds } },(err,list)=>{
                if(err){
                    res.json(err);
                }else{
                    res.json(list);
                }
            });

        }
    });

});
    
router.post('/create',(req,res,next)=>{
        
    let rows = [];
    req.body.rates.forEach(element => {
        element.rate.forEach(elem =>{
            if(elem.price){
                rows.push({
                    prod_id : ObjectId(element.prod_id),
                    is_active: element.is_active,
                    effective_date: new Date(element.effective_date),
                    type : elem.type,
                    price : elem.price,
                    tax : elem.tax,
                    createdBy : ObjectId(req.body.createdBy)
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

router.post('/bulk_update',(req,res,next)=>{
    //console.log(req);
    let updateObj = [];
    for(key in req.body.edit_form){
        //console.log(key+" ::obj:: "+ req.body.edit_form[key]);
        for(val of req.body.edit_form[key]){
            updateObj.push({
                updateOne: {
                    filter: { _id:ObjectId(val._id) },
                    update: { $set: val}
                }
            })
        }
    }
    //console.log("arr::"+updateObj);
    try {
        rate.bulkWrite(updateObj);
        res.json({msg:"Rate updated successfully"});
    }catch (e){
        res.json({msg:"Error occurred!!"});
    }
    
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