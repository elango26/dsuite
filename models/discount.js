const mongoose = require('mongoose');

const discountSchema = mongoose.Schema({
    prod_id : {
        type : String,
        require : true
    },
    to_purchase : {
        type : String,
        require : true
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

const Discount = module.exports = mongoose.model('Discount',discountSchema);