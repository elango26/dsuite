const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorSchema = mongoose.Schema({
    vendor_id:{
        type : String,
        require : true,
        unique: true
    },
    vendorName : {
        type : String,
        require : true
    },
    contactPerson : {
        type : String,
        require : true
    },
    firstName : {
        type : String,
        require : true
    },
    lastName : {
        type : String,
        require : false
    },
    contactNo : {
        type : Number,
        require : true
    },
    contactNo1 : {
        type : Number,
        require : false
    },
    address : {
        type : String,
        require : true
    },
    city : {
        type : String,
        require : true
    },
    pincode : {
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

vendorSchema.path('createdAt').set(function(value) {
    let fYear = new Date(value);
    if([0,1,2].indexOf(fYear.getMonth()) > -1){
        this.financial_year = fYear.getFullYear();
    } else {
        this.financial_year = fYear.getFullYear() + 1;
    }
    return value;
});

const Vendor = module.exports = mongoose.model('Vendor',vendorSchema);