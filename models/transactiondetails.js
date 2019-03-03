const mongoose = require('mongoose');

const transactionDetailsSchema = mongoose.Schema({

    prod_id : {
        type : String,
        require : true
    },
    prod_rate_per_unit : {
        type : Number,
        require : true
    },
    prod_quan : {
        type : String,
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
        type : String,
        require : true
    }
});

const transactionDetails = module.exports = mongoose.model('transactionDetails',transactionDetailsSchema);