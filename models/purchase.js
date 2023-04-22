const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = mongoose.Schema({
    purchase_id:{
        type : String,
        require : true,
        unique: true
    },
    vendor_id: {
        type: Schema.ObjectId,
        ref: 'Vendor'
    },
    purchase_date : {
        type: Date, 
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

purchaseSchema.path('purchase_date').set(function(value) {
    let fYear = new Date(value);
    if([0,1,2].indexOf(fYear.getMonth()) > -1){
        this.financial_year = fYear.getFullYear();
    } else {
        this.financial_year = fYear.getFullYear() + 1;
    }
    return value;
});

const Purchase = module.exports = mongoose.model('Purchase',purchaseSchema);