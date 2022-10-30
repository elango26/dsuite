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
    is_retail : {
        type : String,
        require : true,
        enum: ['YES','NO'],
        default: 'YES'
    },
    leads_view : {
        type : String,
        require : true,
        enum: ['YES','NO'],
        default: 'NO'
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
    },
    barcode: {
        type : Number,
        // require : true,
        // unique : true
    },
    financial_year: {
        type: Number
    }
}, 
{ 
    timestamps: {} 
});

productSchema.path('createdAt').set(function(value) {
    let fYear = new Date(value);
    if([0,1,2].indexOf(fYear.getMonth()) > -1){
        this.financial_year = fYear.getFullYear();
    } else {
        this.financial_year = fYear.getFullYear() + 1;
    }
    return value;
});

const Product = module.exports = mongoose.model('Product',productSchema);