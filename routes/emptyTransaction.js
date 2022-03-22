const express = require('express');
const router = express.Router();

const mtTrans = require('../models/emptyTransaction');
const mtMngmt = require('../models/emptymanagement');
const customer = require('../models/customer');

var genResp = function() {
    return {
        code : 201,
        message : "Error Occurred",
        data: []
    };
}


router.get('/mngmtList',(req,res,next)=>{
    let _resp = genResp();
    mtMngmt.aggregate([
        {"$match":{
            'is_delete':"NO"
        }}
    ]).exec((err,list)=>{
        if(err){
            res.json(_resp);
        }else{
            _resp.code = 200;
            _resp.message = "Success";
            _resp.data = list;
            res.json(_resp);
        }
    });
});

router.get('/transList',(req,res,next)=>{
    //mtTrans
    let _resp = genResp();
    customer.aggregate([
        {"$match":{
            'is_active':'YES'
        }},
        {"$lookup":{
            "from": "routes",
            "localField": "route",
            "foreignField": "_id",
            "as": "routes"
        }},
        {"$lookup":{
            from: 'emptytransactions',
            let: {'cust_id':'$customer_id','q_date':req.query.q_date},
            as: 'trans',
            pipeline: [
              {$addFields:{
                'createdDate' : {$dateToString:{format:'%Y-%m-%d',date:'$createdAt',timezone:'+05:30'}}
              }},
              {$match:{
                  $expr:{
                      $and:[
                          {$eq:['$customer_id','$$cust_id']},
                          {$eq:['$is_active','YES']},
                          {$eq:['$is_delete','NO']},
                          {$lte:['$createdDate','$$q_date']}
                      ]
                  }
              }}
            ]
        }},
        {"$unwind":{
            path: "$trans",
            preserveNullAndEmptyArrays: true
        }},
        {"$group":{
            _id: {customer_id:'$_id'},
            customer: {
                $addToSet: {
                    'customer_id':'$customer_id',
                    'customer_name':'$customerName',
                    'route':'$route',
                    'index':'$index'
                }
            },
            t_receive: {
                $sum: {
                    $cond:[
                        {"$and":[
                            {"$eq": [ "$trans.transaction", "IN" ]},
                            {"$lt": [ "$trans.createdDate", req.query.q_date]}
                        ]},
                        '$trans.count',
                        false
                    ]
                }
            },
            t_deliver: {
              $sum: {
                $cond:[
                    {"$and":[
                        {"$eq": [ "$trans.transaction", "OUT" ]},
                        {"$lt": [ "$trans.createdDate", req.query.q_date]}
                    ]},
                   '$trans.count',
                   false
                ]
              } 
            },
            c_receive: {
                $sum: {
                    $cond:[
                        {"$and":[
                            {"$eq": [ "$trans.transaction", "IN" ]},
                            {"$eq": [ "$trans.createdDate", req.query.q_date]}
                        ]},
                    '$trans.count',
                    false
                    ]
                } 
                },
            c_deliver: {
                $sum: {
                    $cond:[
                        {"$and":[
                            {"$eq": [ "$trans.transaction", "OUT" ]},
                            {"$eq": [ "$trans.createdDate", req.query.q_date]}
                        ]},
                    '$trans.count',
                    false
                    ]
                } 
            }
          }}
    ]).exec((err,list)=>{
        if(err){
            _resp.message = err;
            res.json(_resp);
        }else{
            _resp.code = 200;
            _resp.message = "success";
            _resp.data = list;
            res.json(_resp);
        }
    });
});

router.post('/mngmtCreate',(req,res,next)=>{
    let _resp = genResp();
    let overallMT = new mtMngmt(req.body);
    overallMT.save((err,mtmange)=>{
        if(err){
            res.json(_resp);
        }else{
            _resp.code = 200;
            _resp.message = "Grade added successfully";
            res.json(_resp);
        }
    });
});

router.post('/transSave',(req,res,next)=>{
    let _resp = genResp();
    let temp = [];
    if(req.body){
        if(req.body.trans.length > 0){
            req.body.trans.map(t => {   
                t['updatedBy'] = req.body.createdBy;  
                t['createdBy'] = req.body.createdBy;    
                temp.push({
                    "updateOne": {
                        "filter": {"t_date":t.t_date,"customer_id":t.customer_id,"transaction":t.transaction},
                        "update": { "$set": t },
                        "upsert": true,
                        "setDefaultsOnInsert": true
                    }
                });
                // if(t._id && t._id !=''){   
                //     if(req.body.createdBy != '')
                //         t['updatedBy'] = req.body.createdBy;                 
                //     temp.push({
                //         "updateOne": {
                //             "filter": {"_id":t._id},
                //             "update": { "$set": t }
                //         }
                //     });
                // }else{
                //     if(req.body.createdBy != '')
                //         t['createdBy'] = req.body.createdBy;
                //     temp.push({
                //         "insertOne": {
                //             "document": t
                //         }
                //     });
                // }
            })
        }
    }
    //res.json(temp);
    mtTrans.bulkWrite(temp).then(state => {
        _resp.code = 200;
        _resp.message = "Successfully updated!!";
        res.json(_resp);
    }).catch(err => {
        _resp.message = err;
        res.json(_resp);
    });
    
    //let overallMT = new mtTrans(req.body);
    // overallMT.save((err,trans)=>{
    //     if(err){
    //         res.json(_resp);
    //     }else{
    //         _resp.code = 200;
    //         _resp.message = "Grade Transaction updated successfully";
    //         res.json(_resp);
    //     }
    // });
});

router.put('/update/:id',(req,res,next)=>{
    let _resp = genResp();
    mtMngmt.findByIdAndUpdate(req.params.id, {$set: req.body},(err,vendor)=>{
        if(err){
            _resp.message = err;
            res.json(_resp);
        }else{
            _resp.code = 200;
            _resp.message = "Grade details updated successfully";
            res.json(_resp);
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    let _resp = genResp();
    mtMngmt.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});



module.exports = router;