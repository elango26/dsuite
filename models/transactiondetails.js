const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionDetailsSchema = mongoose.Schema({

    parent_id : {
        type: Schema.ObjectId
    },
    parent_date : {
        type: Date, 
        require : true
    },
    prod_id : {
        type: Schema.ObjectId,
        ref:'Product'
    },
    product_id: {
        type : String,
        require : true
    },
    type : {
        type : String,
        require : true,
        enum: ['SALES','PURCHASE','DAMAGE','ORDER'],
    },
    rate_type: {
        type : String,
        require : true
    },
    prod_rate_per_unit : {
        type : Number,
        require : true
    },
    prod_quan : {
        type : Number,
        require : true
    },
    tax : {
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
    discount_id : {
        type: Schema.ObjectId,
        ref:'Discount',
        require: false
    },
    is_delivered: {
        type: Boolean,
        require: true,
        enum: [true,false],
        default: true
    },
    is_active : {
        type : String,
        require : true,
        enum: ['YES','NO'],
        default: 'YES'
    },
    is_delete : {
        type : String,
        require : true,
        enum: ['YES','NO'],
        default: 'NO'
    },
    financial_year: {
        type: Number
    }
}, 
{ 
    timestamps: {} 
});

transactionDetailsSchema.path('parent_date').set(function(value) {
    let fYear = new Date(value);
    if([0,1,2].indexOf(fYear.getMonth()) > -1){
        this.financial_year = fYear.getFullYear();
    } else {
        this.financial_year = fYear.getFullYear() + 1;
    }
    return value;
});

const transactionDetails = module.exports = mongoose.model('transactionDetails',transactionDetailsSchema);