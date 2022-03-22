const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = mongoose.Schema({
    
    firstName : {
        type : String,
        require : true
    },
    lastName : {
        type : String,
        require : false
    },
    email : {
        type : String,
        require : true
    },
    contactNo : {
        type : String,
        require : true
    },
    contactNo1 : {
        type : String,
        require : false
    },
    address : {
        type : String,
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

const Employee = module.exports = mongoose.model('Employee',employeeSchema);