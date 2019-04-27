const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesSchema = mongoose.Schema({
    customer_id: {
        type: Schema.ObjectId,
        ref: 'Customer'
    },
    sale_date : {
        type: String, 
        require : true
    },
    total_amount : {
        type : Number,
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

const Sales = module.exports = mongoose.model('Sales',salesSchema);