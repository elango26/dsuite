const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesSchema = mongoose.Schema({
    sale_date : {
        type: String, 
        require : true
    },
    total_amount : {
        type : Number,
        require : true
    },
    details : {
        type: Schema.ObjectId,
        ref:'transactionDetails'
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
        type : String,
        require : true
    },
    updatedBy : {
        type : String,
        require : true
    }
}, 
{ 
    timestamps: {} 
});

const Sales = module.exports = mongoose.model('Sales',salesSchema);