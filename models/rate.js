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

const Rate = module.exports = mongoose.model('Rate',rateSchema);