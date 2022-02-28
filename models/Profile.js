const mongoose =  require('mongoose')
const Schema = mongoose.Schema;
const ProfileShcema = new Schema({
      user: {
        type:Schema.Types.ObjectId,
        ref: 'User'
      },
      handle: {
        type: String,
        required: true,
        unique: true,
        max: 40
      },
      website: {
        type: String
      },
      location: {
        type: String
      },
      bio: {
        type: String
      },
      type_of:{
        type: Boolean,
        default: false
    },

      //for user
    contributions:[
      {
        type: Schema.Types.ObjectId,
        ref:'Comment'

      }
  ],
    following: [
      {
        user:{
          type: Schema.Types.ObjectId,
          ref:'User'
        }
      }
    ],
    //for user

    //for organization
    followers: [
      {
        user:{
          type: Schema.Types.ObjectId,
          ref:'User'
        }
      }
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref:'Post'
      }
    ],
    //for organization
    social: {
       
        twitter: {
          type: String
        },
        facebook: {
          type: String
        },
        linkedin: {
          type: String
        },
        instagram: {
          type: String
        }
      }
})

module.exports = Profile = mongoose.model('profile',ProfileShcema)