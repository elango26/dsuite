const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionDetailsSchema = mongoose.Schema({

    parent_id : {
        type: Schema.ObjectId
    },
    prod_id : {
        type: Schema.ObjectId,
        ref:'Product'
    },
    type : {
        type : String,
        require : true,
        enum: ['SALES','PURCHASE'],
    },
    prod_rate_per_unit : {
        type : Number,
        require : true
    },
    prod_quan : {
        type : Number,
        require : true
    },
    prod_tax : {
        type : Number,
        require : true
    },
    sub_amount : {
        type : Number,
        require : true
    },
    prod_discount_id : {
        type: Schema.ObjectId,
        ref:'Discount'
    }
});

const transactionDetails = module.exports = mongoose.model('transactionDetails',transactionDetailsSchema);