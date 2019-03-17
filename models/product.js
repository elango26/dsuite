const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    prod_name : {
        type : String,
        require : true
    },
    alias : {
        type : String,
        require : true
    },
    brand_name : {
        type : String,
        require : true
    },
    vendor_id : {
        type: Schema.ObjectId,
        ref:'Vendor'
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

const Product = module.exports = mongoose.model('Product',productSchema);