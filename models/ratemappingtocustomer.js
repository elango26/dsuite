const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratemappingtocustomerSchema = mongoose.Schema({
    customer_id : {
        type: Schema.ObjectId,
        ref:'Customer'
    },
    prod_id : {
        type: Schema.ObjectId,
        ref:'Product'
    },
    type : {
        type : String,
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
    }
}, 
{ 
    timestamps: {} 
});

const Ratemappingtocustomer = module.exports = mongoose.model('Ratemappingtocustomer',ratemappingtocustomerSchema);