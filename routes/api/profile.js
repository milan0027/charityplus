const express = require("express")
const router = express.Router()
const { validationResult,check}= require('express-validator')
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
//@route GET api/profile/me
//access private
router.get('/me', auth, async(req,res)=>{

    try{
        const profile = await Profile.findOne({ user: req.user.id}).populate(
            'user',
            ['name','avatar','rating','type_of','date']
        )

        if(!profile){
            return res.status(400).json({msg:'no profile exists'})

        }

        res.json(profile)
    } catch(err){
        console.error(err.message)
        res.status(500).send('server error')
    }

    
})

//route post api/profile
//create or update profile

router.post('/',[auth,[
    check('handle','Handle is required')
    .not()
    .isEmpty()
]], 
    async(req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
    
        }

      
    
        const {
          
            location,
            bio,
            facebook,
            twitter,
            instagram,
            linkedin,
            handle
        } = req.body
    
        // build profile object
        const profileFields = {}
        profileFields.user = req.user.id

        const user=await User.findById(req.user.id);
        //incase of error find user and then give type_of to profileField
        if(user) profileFields.type_of = user.type_of
        
        if(location) profileFields.location = location
        if(bio) profileFields.bio = bio
        if(handle) profileFields.handle = handle
    
        profileFields.social = {}
        if(twitter) profileFields.social.twitter = twitter
        if(facebook) profileFields.social.facebook = facebook
        if(linkedin) profileFields.social.linkedin = linkedin
        if(instagram) profileFields.social.instagram = instagram
        
        
        try{
            let duplicate = await Profile.findOne({handle: handle})
           
            let profile = await Profile.findOne({ user: req.user.id})
            if(duplicate && ((!profile)||(duplicate.handle !== profile.handle) ))
            {
                return res.status(400).json({ errors: [{'msg':'Handle already exists'}] })
            }
    
            if(profile){
                //update profile
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id},
                    { $set: profileFields},
                    {new: true})
    
                return res.json(profile)
            }
    
            //create 
            profile = new Profile(profileFields)
    
            await profile.save()
            res.json(profile)
    
           
        }catch(err){
            console.error(err.message)
            res.status(500).send('server error')
        }
})


//route get api/profile/user
//get all user profiles

router.get('/user', async (req, res)=>{
    try {

        const profiles = await Profile.find({type_of: false}).populate(
            'user',
            ['name','avatar','rating']
        )

        res.json(profiles)
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
        
    }
})

//route get api/profile/user/:user_id
//get a user profile

router.get('/user/:user_id', async (req, res)=>{
    try {

        const profile = await Profile.findOne({user: req.params.user_id, type_of:false}).populate(
            'user',
            ['name','avatar','rating']
        )
        if(!profile)
        return res.status(400).json({msg: 'profile not found'})

        res.json(profile)
        
    } catch (err) {
        console.error(err.message)
        if(err.kind ==  'ObjectId')
        return res.status(400).json({msg: 'profile not found'})

        res.status(500).send('server error')
        
    }
})

//route get api/profile/organization
//get all organisation profiles

router.get('/organization', async (req, res)=>{
    try {

        const profiles = await Profile.find({type_of:true}).populate(
            'user',
            ['name','avatar','rating']
        )

        res.json(profiles)
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
        
    }
})

//route get api/profile/organization/:user_id
//get an organisaion profiles

router.get('/organization/:user_id', async (req, res)=>{
    try {

        const profile = await Profile.findOne({user: req.params.user_id, type_of: true}).populate(
            'user',
            ['name','avatar','rating']
        )
        if(!profile)
        return res.status(400).json({msg: 'profile not found'})

        res.json(profile)
        
    } catch (err) {
        console.error(err.message)
        if(err.kind ==  'ObjectId')
        return res.status(400).json({msg: 'profile not found'})

        res.status(500).send('server error')
        
    }
})

// @route  DELETE api/profile 
// @desc    delete profile,user,posts
// @access  Private
router.delete('/',auth,async(req,res)=>{
    try{
        //remove user posts


        //remove profile
        await Profile.findOneAndRemove({user: req.user.id});
        //remove user
        await User.findByIdAndRemove({_id: req.user.id});
        res.json({ msg: 'user deleted'});
    }catch(e){
        console.log(e.message);
        res.status(500).send('server error');
    }
});

module.exports = router