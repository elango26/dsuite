const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/updateAllCollectionsWithFYear',(req,res,next)=>{
    const modelNames = mongoose.modelNames();
    modelNames.forEach((model) => {
        const mySchema = mongoose.model(model);
        console.log("started for the model::", model);
        // search between each fyear and update all 
        [2021,2022,2023].forEach((year) => {
            // Match documents with a specific date
            const startDate = new Date();
            startDate.setDate(1);
            startDate.setMonth(3);
            startDate.setUTCFullYear(year - 1);
            const endDate = new Date();
            endDate.setDate(31);
            endDate.setMonth(2);
            endDate.setUTCFullYear(year);
            console.log("start and end date", startDate +"--"+ endDate);
            const query = { createdAt: { $gte: startDate, $lte: endDate } };

            // Update the matched documents
            const update = { $set: { financial_year: year } };
            const options = { multi: true };

            if (mySchema.schema.paths.hasOwnProperty('createdAt')) {
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

async function fetchCreditDebitsByYear(year,user) {
    const startDate = new Date();
    startDate.setDate(1);
    startDate.setMonth(3);
    startDate.setUTCFullYear(year - 1);
    const endDate = new Date();
    endDate.setDate(31);
    endDate.setMonth(2);
    endDate.setUTCFullYear(year);
    console.log("start and end date", startDate +"--"+ endDate);
    const sales = mongoose.model("Sales");
    const credits = await sales.aggregate([
        {$match:{
            $expr:{
                $and:[
                    {$eq: ["$customer_id", user._id]},
                    {$eq: ["$is_active", "YES"]},
                    {$eq: ["$is_delete", "NO"]},
                    {$gte: ["$sale_date", startDate]},
                    {$lte: ["$sale_date", endDate]},
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
                    {$gte: ["$createdAt", startDate]},
                    {$lte: ["$createdAt", endDate]},
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
                    {$gte: ["$createdAt", startDate]},
                    {$lte: ["$createdAt", endDate]},
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

router.get('/generateUserObForEachFYear', async function(req,res,next){
    const customer = mongoose.model("Customer");
    customer.find({}, function(err, users) {
        if(err){
            res.json("Error in customer");
        }else{
            let fYear = req.query.fyear;
            let temp = [];
            let promiseArr = users.map((user)=>{
                return fetchCreditDebitsByYear(fYear, user).then((result) => {
                    return result;
                });
            })
            Promise.all(promiseArr).then(function(results){
                // console.log(results);
                results.forEach((result) => {
                    if (result.length > 0) {
                        let outstanding = 0;
                        const [credits, debits, obs] = result;
                        console.log(credits,debits,obs);
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

                        console.log("outstanding::",cid,outstanding);
                        // TODO  credits[0]._id sometimes this wont get value
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
                        console.log("success", state);
                        res.json("success");
                    });
                }else{
                    console.log("no records found");
                    res.json("No records found");
                } 
            }).catch(function(err){
                console.log("error happened!!", err);
            });
        }
    });
});
module.exports = router;