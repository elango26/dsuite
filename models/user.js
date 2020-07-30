const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    user_id:{
        type : String,
        require : true,
        unique: true
    },
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
    role : {
        type : String,
        require : true,
        enum: ['SUPERADMIN','ADMIN', 'USER']
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

const User = module.exports = mongoose.model('User',userSchema);