const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const common = require('./common');
// const transactionDetails = require('../models/transactiondetails');
const {ObjectId} = require('mongodb');

router.get('/updateAllTransactionsWithDateOrder',(req,res,next)=>{ 
    // const modelNames = new Map([["Sales","sale_date"],["Orders","order_date"],["Damage","damage_date"],["Purchase","purchase_date"]]);
    const mySchema = mongoose.model("transactionDetails");
    mySchema.aggregate([
        {$match:{
            type: 'ORDER',
            // parent_id: ObjectId('600716b4dea12309085305fd')
        }},
        {$lookup:{
            from: "orders",
            localField: "parent_id",
            foreignField: "_id",
            as: "order"
        }},
        {$unwind:{
            path: '$order',
            // includeArrayIndex: 'string',
            preserveNullAndEmptyArrays: true
        }},
        {$set:{
            parent_date: "$order.order_date"
        }},
        {$project:{
            order: 0
        }},
    ]).exec((err,doc)=>{
        if(err) res.json(err);
        console.log(doc.length);
        const updateTransObj = [];
        doc.forEach((item) => {
            updateTransObj.push({
                updateOne: {
                    filter: { _id: item._id },
                    update: { $set: item }
                  }
            });
            // mySchema.updateOne({_id: item._id}, {$set: item});
        });
        mySchema.bulkWrite(updateTransObj,{ordered:false}).then(sucess=>{
            res.json("order done");
        }).catch(error=>{
            res.json(error);
        }); 
    })
});

router.get('/updateAllTransactionsWithDateSales',(req,res,next)=>{ 
    // const modelNames = new Map([["Sales","sale_date"],["Orders","order_date"],["Damage","damage_date"],["Purchase","purchase_date"]]);
    const mySchema = mongoose.model("transactionDetails");
    mySchema.aggregate([
        {$match:{
            type: 'SALES',
            // parent_id: ObjectId('600716b4dea12309085305fd')
        }},
        {$lookup:{
            from: "sales",
            localField: "parent_id",
            foreignField: "_id",
            as: "sales"
        }},
        {$unwind:{
            path: '$sales',
            // includeArrayIndex: 'string',
            preserveNullAndEmptyArrays: true
        }},
        {$set:{
            parent_date: "$sales.sale_date"
        }},
        {$project:{
            sales: 0
        }},
    ]).exec((err,doc)=>{
        if(err) res.json(err);
        const updateTransObj = [];
        doc.forEach((item) => {
            updateTransObj.push({
                updateOne: {
                    filter: { _id: item._id },
                    update: { $set: item }
                  }
            });
            // mySchema.updateOne({_id: item._id}, {$set: item});
        });
        mySchema.bulkWrite(updateTransObj,{ordered:false}).then(sucess=>{
            res.json("sales done");
        }).catch(error=>{
            res.json(error);
        }); 
    })
});

router.get('/updateAllTransactionsWithDatePurchase',(req,res,next)=>{ 
    // const modelNames = new Map([["Sales","sale_date"],["Orders","order_date"],["Damage","damage_date"],["Purchase","purchase_date"]]);
    const mySchema = mongoose.model("transactionDetails");
    mySchema.aggregate([
        {$match:{
            type: 'PURCHASE',
            // parent_id: ObjectId('600716b4dea12309085305fd')
        }},
        {$lookup:{
            from: "purchases",
            localField: "parent_id",
            foreignField: "_id",
            as: "purchase"
        }},
        {$unwind:{
            path: '$purchase',
            // includeArrayIndex: 'string',
            preserveNullAndEmptyArrays: true
        }},
        {$set:{
            parent_date: "$purchase.purchase_date"
        }},
        {$project:{
            purchase: 0
        }},
    ]).exec((err,doc)=>{
        if(err) res.json(err);
        console.log(doc.length);
        const updateTransObj = [];  
        doc.forEach((item) => {
            updateTransObj.push({
                updateOne: {
                    filter: { _id: item._id },
                    update: { $set: item }
                  }
            });
            // mySchema.updateOne({_id: item._id}, {$set: item});
        });
        console.log(updateTransObj);
        mySchema.bulkWrite(updateTransObj,{ordered:false}).then(sucess=>{
            res.json("purchase done");
        }).catch(error=>{
            res.json(error);
        }); 
    })
});

router.get('/updateAllTransactionsWithDateDamage',(req,res,next)=>{ 
    // const modelNames = new Map([["Sales","sale_date"],["Orders","order_date"],["Damage","damage_date"],["Purchase","purchase_date"]]);
    const mySchema = mongoose.model("transactionDetails");
    mySchema.aggregate([
        {$match:{
            type: 'DAMAGE',
            // parent_id: ObjectId('600716b4dea12309085305fd')
        }},
        {$lookup:{
            from: "damages",
            localField: "parent_id",
            foreignField: "_id",
            as: "damage"
        }},
        {$unwind:{
            path: '$damage',
            // includeArrayIndex: 'string',
            preserveNullAndEmptyArrays: true
        }},
        {$set:{
            parent_date: "$damage.damage_date"
        }},
        {$project:{
            damage: 0
        }},
    ]).exec((err,doc)=>{
        if(err) res.json(err);
        const updateTransObj = [];
        doc.forEach((item) => {
            updateTransObj.push({
                updateOne: {
                    filter: { _id: item._id },
                    update: { $set: item }
                  }
            });
            // mySchema.updateOne({_id: item._id}, {$set: item});
        });
        mySchema.bulkWrite(updateTransObj,{ordered:false}).then(sucess=>{
            res.json("damage done");
        }).catch(error=>{
            res.json(error);
        }); 
    })
});

router.get('/updateAllCollectionsWithFYear',(req,res,next)=>{
    const restrictModelNames = new Map([["Sales","sale_date"],["Orders","order_date"],["Damage","damage_date"],["Purchase","purchase_date"],["transactionDetails","parent_date"]]);
    const modelNames = mongoose.modelNames();
    modelNames.forEach((model) => {
        const mySchema = mongoose.model(model);
        console.log("started for the model::", model);
        // search between each fyear and update all 
        [2021,2022,2023].forEach((year) => {
            // Match documents with a specific date
            const startDate = new Date();
            startDate.setHours(0,0,0,0);
            startDate.setDate(1);
            startDate.setMonth(3);
            startDate.setUTCFullYear(year - 1);
            const endDate = new Date();
            endDate.setHours(23,59,59,999);
            endDate.setDate(31);
            endDate.setMonth(2);
            endDate.setUTCFullYear(year);
            console.log("start and end date", startDate +"--"+ endDate);
            // add query contraints to check for ist times
            var paramName = 'createdAt';
            var query = { createdAt: { $gte: startDate, $lte: endDate } };
            if(restrictModelNames.has(model)){
                paramName = restrictModelNames.get(model);
                query = {};
                query[paramName] = { $gte: startDate, $lte: endDate };
            }
            console.log(query);

            // Update the matched documents
            const update = { $set: { financial_year: year } };
            const options = { multi: true };

            if (mySchema.schema.paths.hasOwnProperty(paramName)) {
                mySchema.updateMany(query, update, options, function(err, result) {
                    if (err) {
                    // Handle error
                        console.log(model+" has error with start and end date", startDate +"--"+ endDate);
                    } else {
                        console.log(`${result.nModified} documents updated`);
                    }
                });
            }
        });
    })
    res.json(modelNames);
});

router.get('/generateUserObForEachFYear', async function(req,res,next){
    if(!!req.query.fyear && !isNaN(req.query.fyear))
    {
        common.generateUserObForEachYear(req.query.user, req.query.fyear).then((result) => {
            res.json(result);
        })
    }else{
        res.json("pls send fyear value!!");
    }

});
module.exports = router;