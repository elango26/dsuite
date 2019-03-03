const mongoose = require('mongoose');

const rateSchema = mongoose.Schema({
    prod_id : {
        type : String,
        require : true
    },
    type : {
        type : String,
        require : true
    },
    price : {
        type : Number,
        require : true
    },
    tax : {
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

const Rate = module.exports = mongoose.model('Rate',rateSchema);