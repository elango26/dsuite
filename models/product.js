const mongoose = require('mongoose');

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
        type : String,
        require : false
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

const Product = module.exports = mongoose.model('Product',productSchema);