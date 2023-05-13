const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = mongoose.Schema({
    order_id:{
        type : String,
        require : true,
        unique: true
    },
    customer_id: {
        type: Schema.ObjectId,
        ref: 'Customer'
    },
    order_date : {
        type: Date, 
        require : true
    },
    is_delivered : {
        type : String,
        require : true,
        enum: ['YES','NO'],
        default: 'NO'
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

ordersSchema.path('order_date').set(function(value) {
    let fYear = new Date(value);
    if([0,1,2].indexOf(fYear.getMonth()) > -1){
        this.financial_year = fYear.getFullYear();
    } else {
        this.financial_year = fYear.getFullYear() + 1;
    }
    return value;
});

const Orders = module.exports = mongoose.model('Orders',ordersSchema);