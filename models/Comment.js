const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const commentSchema=new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type:String
    },
    images:{
        type: [String]
        // required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes:[
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    unlikes:[
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    approval: {
        type: Boolean,
        default: false
    }
});

module.exports = Comment = mongoose.model('Comment', commentSchema)