const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    product_id: {
        type : String,
        require : true,
        unique : true
    },
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
    category : {
        type : String,
        require : true
    },
    measure_unit: {
        type : String,
        require : true
    },
    volume_per_unit: {
        type: Number,
        require: true
    },
    quan_per_grade: {
        type: Number,
        require: true
    },
    sub_category : {
        type : String,
        require : false
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
    },
    index : {
        type: Number,
        require : true
    }
}, 
{ 
    timestamps: {} 
});

const Product = module.exports = mongoose.model('Product',productSchema);