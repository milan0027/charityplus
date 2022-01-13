const express = require("express")
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt =  require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')

const User = require('../../models/User')
//@route Post api/users
router.post('/', [
    check('name', 'Name is required')
    .not().
    isEmpty(),

    check('email','please include an email')
    .isEmail(),

    check('password','please enter a passoword of more than length 6')
    .isLength({min:6})

], async (req,res)=> {

    const errors =await validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
    //console.log(req.body)

    const { name, email, password} = req.body

    try{
     // see if user exists

     let user = await User.findOne({email})

     if(user){
        return res.status(400).json({ errors: [{msg:'user already exists'}] })
     }


    //get users gravatar
    const avatar = gravatar.url(email, {
        s:'200',
        r:'pg',
        d: 'mm'
    })

    user = new User({
        name,
        email,
        avatar,
        password
    })


    //encrypt password

    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(password, salt)
    await user.save()

   
    //return jsonwebtoken
    const payload = {
        user: {
            id: user.id
        }
    }

    jwt.sign(payload, 
        config.get('jwtSecret'),
        { expiresIn: 360000},
        (err,token) =>{
            if(err)
                throw err
            res.json({token})
        } )

    }catch(err){
        console.log(err.message)
       return res.status(500).send('server error')
    }
    
   
    //res.send('user route')
})

module.exports = router