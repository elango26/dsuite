const express = require('express');
const router = express.Router();
const multer = require('multer');
const readXlsxFile = require('read-excel-file/node');
const product = require('../models/product');
const common = require('./common');
const upload = multer({ dest: 'uploads/' })
const path = require('path');
const {ObjectId} = require('mongodb');
const mongoose = require('mongoose');
const { error } = require('console');

router.get('/list',(req,res,next)=>{
    let aggProdArr = [
        {  
        "$match":{
            "is_active": "YES",
            "is_delete": "NO"
        }},
        {
        "$sort":{
            "index":1
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
            "from": "vendors",
            "localField": "vendor_id",
            "foreignField": "_id",
            "as": "vendor"
        }}
    ];
    if(req.query.getRetailPrice){
        aggProdArr.push({
            "$lookup": {
            "from": "rates",
            "let": {"pid": "$_id"},
            "as": "rate",
            "pipeline": [
                {$match:{
                    $expr:{
                        $and:[
                            {$eq:['$is_active','YES']},
                            {$lte:['$effective_date', new Date()]},
                            {$eq:['$prod_id','$$pid']},
                            {$eq:['$type','Retail']},

                        ]
                    }
                }},
                {"$sort":{
                    "effective_date":-1
                }}
            ]
        }});
        aggProdArr.push(
            {"$set": {
                "rate" : { $arrayElemAt: ["$rate", 0] },
            }}
        );
    }
    product.aggregate(aggProdArr).exec((err,list)=>{
        if(err){
            res.json(err);
        }else{
            res.json(list);
        }
    });
});
    
router.get('/orderList',(req,res,next)=>{
    
    product.aggregate([
        //{ $match: { status: "A" } },
        //{ $group: { _id: "$cust_id", total: { $sum: "$amount" } } },
        //{ $sort: { total: -1 } }
        { $group: { _id: {category:"$category",sub:"$sub_category"}}},
        { $group : { 
            _id :  "$_id.category",
            terms: { 
                $push: { 
                    term:"$_id.sub"
                }
            }
         }
       }
    ]).exec((err,list)=>{
        if(err){
            res.json(err);
        }else{
            res.json(list);
        }
    });
});

router.get("/getcount",(req,res,next)=> {
    product.countDocuments(function(err, count) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        var obj = {
            'count': common.padding(count+1,7,"SKU"),
            'length': '2'
        }
        res.json(obj); // return return the count in JSON format
    });
});

router.post('/create',(req,res,next)=>{
    product.countDocuments(function(err, count) {
        if(!err){
            req.body['product_id'] = common.padding(count+1,7,'SKU');
            req.body['index'] = count;
    
            let newProduct = new product(req.body);    
            if(req.body._id)
                newProduct.isNew = false;
            
            newProduct.save((err,product)=>{
                if(err){
                    res.json(err);
                }else{
                    res.json({msg:'product added successfully'});
                }
            });
        }else{
            res.json({msg:'Error in count:: Product'});
        }
    });
});

router.put('/update/:id',(req,res,next)=>{
    //console.log(req);
    let newProduct = new product(req.body);    
    if(req.body._id)
        newProduct.isNew = false;
    
    newProduct.save((err,product)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'product added successfully',data:product});
        }
    });

    // product.findByIdAndUpdate(req.params.id, {$set: req.body},(err,product)=>{
    //     if(err){
    //         res.json(err);
    //     }else{
    //         res.json({msg:'product updated successfully'});
    //     }
    // });
});

router.delete('/delete/:id',(req,res,next)=>{
    product.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});

router.post('/bulkUpload',upload.single('file'), (req,res,next)=>{
    const filePath = path.join(__basedir,'uploads') + '/' + req.file.filename;
   
    readXlsxFile(filePath).then((rows) => {
        if(rows && rows.length > 0){
            product.countDocuments(function(err, count) {
                if(!err){
                    /** TODO
                     * it is danger to use like this
                     * if so, make sure another save should not happen
                     */ 
                    var current_count  = count;
                    var newRows = rows.map(row => {
                        // console.log(row);
                        const [prod_name,alias,brand_name,category,measure_unit,volume_per_unit,quan_per_grade,sub_category,is_retail,leads_view,barcode,price] = row; 
                        let product_id_generated = common.padding(++current_count,7,'SKU');
                        return {
                            product: {
                                product_id:product_id_generated,
                                prod_name:prod_name,
                                alias:alias,
                                brand_name:brand_name,
                                category:category,
                                measure_unit:measure_unit,
                                volume_per_unit:volume_per_unit,
                                quan_per_grade:quan_per_grade,
                                sub_category:sub_category,
                                is_retail:is_retail,
                                leads_view:leads_view,
                                barcode:barcode,
                                index:current_count
                            },
                            rate: {
                                product_id:product_id_generated,
                                price:price
                            }
                        }
                    });
                    // console.log("new rows",newRows);
                    //try map for both product and rate inserts
                    
                    const promiseRows = newRows.map( async (row) => {
                        return await new product(row.product).save();
                    });
                    Promise.all(promiseRows).then((result) => {
                        console.log("result",result);
                        const rateEntries = newRows.map( (r) => {
                            return {
                                prod_id: result.filter(pr => pr.product_id == r.rate.product_id)[0]._id,
                                type: 'Retail',
                                tax: 0,
                                price: r.rate.price,
                                createdBy: ObjectId(req.createdBy),
                                effective_date: new Date(),
                            }
                        });
                        console.log(rateEntries);
                        const rateObj = mongoose.model("Rate");
                        try {
                            rateObj.insertMany(rateEntries,{ordered:false});
                            let resp = {
                                code : 200,
                                message : "Product uploaded successfully!",
                                data: {}
                            }
                            res.json(resp);
                        } catch(error) {
                            let resp = {
                                code : 201,
                                message : "Product uploaded failed on rate entry!",
                                data: error
                            }
                            res.json(resp);
                        }
                    }).catch(error => {
                        let resp = {
                            code : 201,
                            message : "Upload failed!",
                            data: error
                        }
                        res.json(resp);
                    });
                   
                } else {
                    let resp = {
                        code : 201,
                        message : "Error in count documents",
                        data: {}
                    }
                    res.json(resp);
                }
            });
            
            
        }
    }).catch(error => {
        let resp = {
            code : 201,
            message : "Error in file read!",
            data: error
        }
        res.json(resp);
    });
});



module.exports = router;