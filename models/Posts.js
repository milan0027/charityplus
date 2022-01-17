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
                type: [String],
                required: true
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

        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Post = mongoose.model('post', PostSchema)