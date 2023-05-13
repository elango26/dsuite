const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discountTransSchema = mongoose.Schema({
    // trans_id:{
    //     type : String,
    //     require : true,
    //     unique: true
    // },
    sale_id: {
        type: String,
        require : true
    },
    discount_id : {
        type: Schema.ObjectId,
        ref: 'Discount'
    },
    prod_id : {
        type : String,
        require : true
    },
    prod_count : {
        type : Number,
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
    },
    financial_year: {
        type: Number
    }
}, 
{ 
    timestamps: {} 
});

discountTransSchema.path('createdAt').set(function(value) {
    let fYear = new Date(value);
    if([0,1,2].indexOf(fYear.getMonth()) > -1){
        this.financial_year = fYear.getFullYear();
    } else {
        this.financial_year = fYear.getFullYear() + 1;
    }
    return value;
});

const DiscountTransaction = module.exports = mongoose.model('DiscountTransaction',discountTransSchema);