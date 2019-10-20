const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discountSchema = mongoose.Schema({
    prod_id : {
        type: Schema.ObjectId,
        ref:'Product'
    },
    to_purchase : {
        type : String,
        require : true
    },
    discount_type: {
        type : String,
        require : true
    },
    discount_constraint: {
        type: String,
        require: true
    },
    to_off : {
        type : String,
        require : true
    },
    from_date : {
        type : Date,
        require : true
    },
    to_date : {
        type : Date,
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

const Discount = module.exports = mongoose.model('Discount',discountSchema);