const express = require('express');
const router = express.Router();

const sales = require('../models/sales');

router.post('/invoices',(req,res,next)=>{
    sales.aggregate([
        {"$addFields":{
            localDate: {$dateToString:{format:"%Y-%m-%d",date:'$sale_date',timezone:'+05:30'}}
        }},
        {"$match":{
            sale_id:{$in:req.body.invoices}
        }},
        {"$lookup":{
            from: 'transactiondetails',
            as: 'details',
            let: { parent_id: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$parent_id', '$$parent_id'] },
                      { $eq: ['$type',req.body.type]},
                      { $eq: ['$is_active', 'YES']},
                      { $eq: ['$is_delete', 'NO']}
                    ]
                  }
                }
              }
            ]
        }},
        {"$unwind":{
            path: '$details',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
        }},
        {"$lookup":{
            from: 'products',
            localField: 'details.prod_id',
            foreignField: '_id',
            as: 'details.product'
        }},
        {"$unwind":{
            path: '$details.product',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
        }},
        {"$group":{
            _id: '$_id',
            'details': {
              $push : '$details'
            }
        }},
        {"$lookup":{
            from: 'sales',
            localField: '_id',
            foreignField: '_id',
            as: 'sales'
        }},
        {"$unwind":{
            path: '$sales',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
        }},
        {"$lookup":{
            from: 'customers',
            localField: 'sales.customer_id',
            foreignField: '_id',
            as: 'sales.customer'
        }},
        {"$unwind":{
            path: '$sales.customer',
            //includeArrayIndex: '<<string>>',
            preserveNullAndEmptyArrays: true
        }}
    ]).exec((err,list)=>{
        if(!err){
            let resp = {
                code : 200,
                message : "Invoice loaded!!",
                data: list
            }
            res.json(resp);
        }
    });
})
module.exports = router;