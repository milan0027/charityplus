const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PostSchema = new Schema({
    user: {
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
    avatar: {
        type: String
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
    image:{
        type:String
    },
    comments: [
        {
            type:Schema.Types.ObjectId,
            ref: 'comments'
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Post = mongoose.model('Post', PostSchema)