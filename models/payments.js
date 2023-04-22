const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = mongoose.Schema({
    payment_id:{
        type : String,
        require : true,
        unique: true
    },
    payment_type : {
        type : String,
        require : true,
        enum: ['CASH','WALLET'],
        default: 'CASH'
    },    
    customer_id: {
        type: Schema.ObjectId,
        ref: 'Customer'
    },
    amount : {
        type : Number,
        require : true,
        default: null
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

paymentSchema.path('createdAt').set(function(value) {
    // this._createdAt = value;
    let fYear = new Date(value);
    if([0,1,2].indexOf(fYear.getMonth()) > -1){
        this.financial_year = fYear.getFullYear();
    } else {
        this.financial_year = fYear.getFullYear() + 1;
    }
    return value;
});

const Payment = module.exports = mongoose.model('Payment',paymentSchema);