const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const obSchema = mongoose.Schema({
    customer_id : {
        type: Schema.ObjectId,
        ref: 'Customer'
    },
    description : {
        type : String,
        require : true
    },
    amount : {
        type : Number,
        require : true,
        default: null
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

//not required here, but still to maintain fyear we can keep it
obSchema.path('createdAt').set(function(value) {
    let fYear = new Date(value);
    if([0,1,2].indexOf(fYear.getMonth()) > -1){
        this.financial_year = fYear.getFullYear();
    } else {
        this.financial_year = fYear.getFullYear() + 1;
    }
    return value;
});

module.exports = mongoose.model('OpeningBalance',obSchema);