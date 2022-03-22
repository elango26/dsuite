const rate = require('../models/rate');
const sales = require('../models/sales');
const discountRoute = require('./discount');

let common = {};
common.firstmethod = function(){
    console.log('first method');
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
module.exports = common;