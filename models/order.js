const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = mongoose.Schema({
    customer_id: {
        type: Schema.ObjectId,
        ref: 'Customer'
    },
    order_date : {
        type: String, 
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

const Orders = module.exports = mongoose.model('Orders',ordersSchema);