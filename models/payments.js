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
    }
}, 
{ 
    timestamps: {} 
});


const Payment = module.exports = mongoose.model('Payment',paymentSchema);