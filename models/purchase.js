const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = mongoose.Schema({
    purchase_id:{
        type : String,
        require : true,
        unique: true
    },
    vendor_id: {
        type: Schema.ObjectId,
        ref: 'Vendor'
    },
    purchase_date : {
        type: Date, 
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

const Purchase = module.exports = mongoose.model('Purchase',purchaseSchema);