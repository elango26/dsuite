const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    firstName : {
        type : String,
        require : true
    },
    lastLame : {
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
    role : {
        type : String,
        require : true,
        enum: ['ADMIN', 'USER']
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

const User = module.exports = mongoose.model('User',userSchema);