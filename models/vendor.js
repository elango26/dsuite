const mongoose = require('mongoose');

const vendorSchema = mongoose.Schema({
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

const Vendor = module.exports = mongoose.model('Vendor',vendorSchema);