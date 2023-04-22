const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emptySchema = mongoose.Schema({
    emptyName: {
        type: String,
        require: true
    },
    count: {
        type: Number,
        require: true
    },
    entryType: {
        type: String,
        require: true,
        enum: ['IN','OUT']
    },
    description: {
        type: String,
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
    },
    financial_year: {
        type: Number
    }
},
{ 
    timestamps: {} 
});

emptySchema.path('createdAt').set(function(value) {
    let fYear = new Date(value);
    if([0,1,2].indexOf(fYear.getMonth()) > -1){
        this.financial_year = fYear.getFullYear();
    } else {
        this.financial_year = fYear.getFullYear() + 1;
    }
    return value;
});

module.exports = mongoose.model('EmptyManagement',emptySchema);