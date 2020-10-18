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
    }
},
{ 
    timestamps: {} 
});

module.exports = mongoose.model('EmptyManagement',emptySchema);