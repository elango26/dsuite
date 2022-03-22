const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emptyTransSchema = mongoose.Schema({
    customer_id : {
        type: String,
        require: true
    },
    emptyName: {
        type: String,
        require: false
    },
    count: {
        type: Number,
        require: true
    },
    transaction: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    t_date: {
        type: Date,
        require: true
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

module.exports = mongoose.model('EmptyTransaction',emptyTransSchema);