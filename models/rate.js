const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rateSchema = mongoose.Schema({
    prod_id : {
        type: Schema.ObjectId,
        ref:'Product'
    },
    type : {
        type : String,
        require : true
    },
    customer_id : {
        type: Schema.ObjectId,
        ref:'Customer',
        require : false
    },
    price : {
        type : Number,
        require : true,
        default: null
    },
    tax : {
        type : String,
        require : false,
        default: null
    },
    effective_date : {
        type: Date, 
        require : true
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
    createdBy : {
        type: Schema.ObjectId,
        ref:'User'
    },
    updatedBy : {
        type: Schema.ObjectId,
        ref:'User'
    },
    financial_year: {
        type: Number
    }
}, 
{ 
    timestamps: {} 
});

rateSchema.path('createdAt').set(function(value) {
    let fYear = new Date(value);
    if([0,1,2].indexOf(fYear.getMonth()) > -1){
        this.financial_year = fYear.getFullYear();
    } else {
        this.financial_year = fYear.getFullYear() + 1;
    }
    return value;
});

const Rate = module.exports = mongoose.model('Rate',rateSchema);