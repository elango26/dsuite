const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const common = require('./common');

router.get('/updateAllCollectionsWithFYear',(req,res,next)=>{
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