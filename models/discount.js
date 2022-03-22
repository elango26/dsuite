const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discountSchema = mongoose.Schema({
    buy_prod_id : {
        type: Schema.ObjectId,
        ref:'Product'
    },
    buy_count : {
        type : String,
        require : true
    },
    free_prod_id : {
        type: Schema.ObjectId,
        ref:'Product'
    },
    free_count : {
        type : String,
        require : true
    },
    discount_type: {
        type : String,
        require : true
    },
    discount_name: {
        type: String,
        require: true
    },    
    from_date : {
        type : Date,
        require : true
    },
    to_date : {
        type : Date,
        require : true
    },
    applicable_type : {
        type : Array,
        require : true,
        default : []
    },
    applicable_customer : {
        type : Array,
        require : true,
        default : []
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