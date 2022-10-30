const express = require('express');
const router = express.Router();
const multer = require('multer');
const readXlsxFile = require('read-excel-file/node');
const product = require('../models/product');
const common = require('./common');
const upload = multer({ dest: 'uploads/' })
const path = require('path');
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
        console.log(rows);
        // Remove Header ROW
        rows.shift();
        res.json("success");
    }).catch(error => res.json(error));
});



module.exports = router;