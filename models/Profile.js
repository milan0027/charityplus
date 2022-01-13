const mongoose =  require('mongoose')
const Schema = mongoose.Schema;
const ProfileShcema = new Schema({
    user: {
        type:Schema.Types.ObjectId,
        ref: 'users'
      },
      handle: {
        type: String,
        required: true,
        unique: true,
        max: 40
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
    contributions:{
        type: Array,
        ref:'contributions'

    },
    following: {
        type: [String]
    },
    //for user

    //for organization
    followers: {
      type: Array
    },
    posts:{
      type: Array,

    },
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