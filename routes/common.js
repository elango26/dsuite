const rate = require('../models/rate');
const sales = require('../models/sales');
const discountRoute = require('./discount');
const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');

let common = {};
common.firstmethod = function(){
    console.log('first method');
}

common.getFinancialYear = (date = new Date()) => {
    let fYear = new Date(date);
    if([0,1,2].indexOf(fYear.getMonth()) > -1){
        return fYear.getFullYear();
    } else {
        return fYear.getFullYear() + 1;
    }
}
common.padding = function(n,width,prefix){
    n = n + ''; 
    return n.length >= width ? prefix+n :  
    prefix+new Array(width - n.length + 1).join('0') + n;
}
common.getCount = () => {
    return new Promise(function(resolve, reject) {
        sales.countDocuments(function(err,count){
            if(!err){
                resolve(common.padding(count+1,7,'POS'));
            }else{
                reject(err);
            }
        });
    });
}
common.getRateDiscountList = function(req){
    const promise1 = common.getDiscounts(req);
    const promise2 = common.getRateList();
    return Promise.all([promise1,promise2]);
}
common.getDiscounts = function(req){
    return new Promise(function(resolve,reject){        
        discountRoute.getDiscounts(req).then(result=>{
            resolve(result);
        },err=>{
            reject(err);
        });        
    });
}

common.getRateList = function(){
    return new Promise(function(resolve, reject) {    
        rate.aggregate([
            {"$addFields":{
                'localdate':{ "$dateToString": { format: "%Y-%m-%d", date: "$effective_date", timezone: "+05:30" } } 
            }},
            {
                "$group":{
                    "_id": "$prod_id",
                    "rates": {
                    $push: "$$ROOT"
                    }
                }
            },
            {             
                "$lookup": {
                    "from": 'products',
                    "localField": '_id',
                    "foreignField": '_id',
                    "as": 'products'
                }
            },
            {
                "$replaceRoot":{
                    newRoot: {
                    $mergeObjects: [{ $arrayElemAt: [ "$products", 0 ] },"$$ROOT"]
                    }
                }
            },
            {
                "$project":{
                    "products": 0
                }
            }        
        ]).exec((err,list)=>{
            if(err){
                reject(err);
            }else{
                var product = [];
                if(list.length > 0){
                    for (const key in list) {
                        result = {};
                        result["product"] = list[key];
                        for(const j in list[key].rates){
                            if(!result["product"]["rate_avail"])
                                result["product"]["rate_avail"] = {};
                            if(!result["product"]["rate_avail"][list[key].rates[j].type])
                                result["product"]["rate_avail"][list[key].rates[j].type] = [];

                            result["product"]["rate_avail"][list[key].rates[j].type].push(list[key].rates[j]);

                            

                            let arr_date = new Date(list[key].rates[j].effective_date);
                            
                            if(list[key].rates[j].is_active == "YES" && arr_date.getTime() <= new Date().getTime()){
                                if(!result["product"]["rate_active"])
                                    result["product"]["rate_active"] = {};
                                if(!result["product"]["rate_active"][list[key].rates[j].type])
                                    result["product"]["rate_active"][list[key].rates[j].type] = {};
                                if(result["product"]["rate_active"][list[key].rates[j].type].effective_date){
                                    let exist_date = new Date(result["product"]["rate_active"][list[key].rates[j].type].effective_date);
                                    let new_date = new Date(list[key].rates[j].effective_date);
                                
                                    if(exist_date.getTime() < new_date.getTime()){
                                        result["product"]["rate_active"][list[key].rates[j].type] = list[key].rates[j];
                                    }
                                }else{
                                    // first exec
                                    result["product"]["rate_active"][list[key].rates[j].type] = list[key].rates[j];
                                }
                            }                            
                        }
                        product.push(result);
                    }
                }
                resolve(product);
            }
        });
    });
}

common.fetchCreditDebitsByYear = async function(year,user) {
    // console.log("called!!");
    year = parseInt(year);
    const sales = mongoose.model("Sales");
    const credits = await sales.aggregate([
        {$match:{
            $expr:{
                $and:[
                    {$eq: ["$customer_id", user._id]},
                    {$eq: ["$is_active", "YES"]},
                    {$eq: ["$is_delete", "NO"]},
                    {$eq: ["$payment_type", "CREDIT"]},
                    {$eq: ["$financial_year", year]},
                    // {$gte: ["$sale_date", startDate]},
                    // {$lte: ["$sale_date", endDate]},
                ]
            }
        }},
        {$group:{
            _id: '$customer_id',
            t_credit: {
                $sum: '$total_amount'
            }
        }}
    ]).exec(); 

    const payments = mongoose.model("Payment");
    const debits = await payments.aggregate([
        {$match:{
            $expr:{
                $and:[
                    {$eq: ["$customer_id", user._id]},
                    {$eq: ["$is_active", "YES"]},
                    {$eq: ["$is_delete", "NO"]},
                    {$eq: ["$financial_year", year]},
                    // {$gte: ["$createdAt", startDate]},
                    // {$lte: ["$createdAt", endDate]},
                ]
            }
        }},
        {$group:{
            _id: '$customer_id',
            t_debit: {
                $sum: '$amount'
            }
        }}
    ]).exec();
    const ob = mongoose.model("OpeningBalance");
    const obs = await ob.aggregate([
        {$match:{
            $expr:{
                $and:[
                    {$eq: ["$customer_id", user._id]},
                    {$eq: ["$is_active", "YES"]},
                    {$eq: ["$is_delete", "NO"]},
                    {$eq: ["$financial_year", year]},
                    // {$gte: ["$createdAt", startDate]},
                    // {$lte: ["$createdAt", endDate]},
                ]
            }
        }},
        {$group:{
            _id: '$customer_id',
            t_ob: {
                $sum: '$amount'
            }
        }}
    ]).exec();
    return Promise.all([credits,debits,obs]); 
}

common.generateUserObForEachYear = async function(user, year){
    let _resp = {
        code : 201,
        message : "Error Occurred",
        data: []
    };
    let customerObj = {};
    if(!!user)
    {
        customerObj = { _id: ObjectId(user) }
    }
    
    return new Promise((resolve, reject) => {
        const customer = mongoose.model("Customer");
        customer.find(customerObj, function(err, users) {
            if(err){
                _resp.message = "Error in customer";
                reject(_resp);
            }else{
                let fYear = year;
                let temp = [];
                let promiseArr = users.map((user)=>{
                    return common.fetchCreditDebitsByYear(fYear, user).then((result) => {
                        return result;
                    });
                })
                Promise.all(promiseArr).then(function(results){
                    // console.log(results);
                    results.forEach((result) => {
                        if (result.length > 0) {
                            let outstanding = 0;
                            const [credits, debits, obs] = result;
                            // console.log(credits,debits,obs);
                            const credit = credits.length > 0 ? credits[0].t_credit : 0;
                            const debit = debits.length > 0 ? debits[0].t_debit : 0;
                            const ob = obs.length > 0 ? obs[0].t_ob : 0;
                            const nextFYear = parseInt(fYear)+1;
                            outstanding = (parseInt(credit) + parseInt(ob)) - parseInt(debit);
                            
                            let cid;
                            if( credits.length > 0 && credits[0]._id){
                                cid = credits[0]._id;
                            }else if(debits.length > 0 && debits[0]._id){
                                cid = debits[0]._id;
                            }else if(obs.length > 0 && obs[0]._id){
                                cid = obs[0]._id;
                            }
    
                            // console.log("outstanding::",cid,outstanding);
                            if (outstanding >= 1) {
                                temp.push({
                                    "updateOne": {
                                        "filter": { "customer_id": cid, "financial_year": nextFYear },
                                        "update": { "$set": { "financial_year": nextFYear, "customer_id": cid, "amount": outstanding } },
                                        "upsert": true,
                                        "setDefaultsOnInsert": true
                                    }
                                });
                            }   
                        }
                    });
                    if(temp.length > 0){
                        // res.json(temp);
                        const ob = mongoose.model("OpeningBalance");
                        ob.bulkWrite(temp,  { setDefaultsOnInsert: true }).then(state => {
                            _resp.code = 200;
                            _resp.message = "success";
                            resolve(_resp);
                        });
                    }else{
                        _resp.message = "no records found";
                        reject(_resp);
                    } 
                }).catch(function(err){
                    _resp.message = "Error in promise all";
                    reject(_resp);
                });
            }
        });
    }); 
    
}
module.exports = common;