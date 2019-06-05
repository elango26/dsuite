const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = mongoose.Schema({
    type : {
        type : String,
        require : true
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
    }
}, 
{ 
    timestamps: {} 
});


const Expense = module.exports = mongoose.model('Expense',expenseSchema);