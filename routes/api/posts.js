const express = require("express")

const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const Post = require("../../models/Post")
const User = require("../../models/User")
const Comment = require("../../models/Comment")

//@route GET api/posts
//desc   create a post
//access  private
router.post('/',[ auth, [
    check('text','Text is required')
    .not()
    .isEmpty()
]], async (req,res)=> {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }

    try {
        const user = await User.findById(req.user.id).select('-password')
        const organization= await Profile.findOne({user: req.user.id});
        if(!user.type_of)
        return res.status(400).json({ errors: [{"msg": "you are not allowed to post"}]})

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
            image: req.body.text
        })

        organization.posts.unshift({ post: newPost._id});
        const post = await newPost.save()

        await organization.save();

        res.json(post)
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
        
    }

    

})


//@route GET api/posts
//desc   get all posts
//access  private
router.get('/', auth, async(req,res)=>{

    try {
        const posts = await Post.find().sort({ date: -1})
        res.json(posts)
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
        
    }

})

//@route GET api/posts/:id
//desc   get a post
//access  private
router.get('/:id', auth, async(req,res)=>{

    try {
        const post = await Post.findById(req.params.id).populate('comments'); //do we need to nest populate the user..also do we need to populate user of post

        if(!post)
        return res.status(404).json({msg:'Post not found'})

        res.json(post)
        
    } catch (err) {
        console.error(err.message)
        if(err.kind === 'ObjectId')
             return res.status(404).json({msg:'Post not found'})
        res.status(500).send('server error')
        
    }

})

//@route DELETE api/posts/:id
//desc   delete a post
//access  private
router.delete('/:id', auth, async(req,res)=>{

    try {
        const profile = await Profile.findOne({user: req.user.id});
        const post = await Post.findById(req.params.id)

        if(!post)
            return res.status(404).json({msg:'Post not found'})
        //check user
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'user not authorized'})

        }
        
        //remove all comments connected to this post;
        post.comments.forEach(async(comment)=>{
            await Comment.findByIdAndDelete(comment.id);
        });
        if(profile.posts.filter( post => post.post.toString()===req.params.id) > 0){
            const removeIndex = profile.posts.map( post => post.post.toString()).indexOf(req.params.id)
            profile.posts.splice(removeIndex, 1)
            await profile.save()
        }

        await post.remove()

        
        res.json({msg: 'post removed'})
        
    } catch (err) {
        console.error(err.message)
        if(err.kind === 'ObjectId')
             return res.status(404).json({msg:'Post not found'})
        res.status(500).send('server error')
        
    }

})

//@route PUT api/posts/like/:id
//desc   like a post
//access  private
router.put('/like/:id',auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post)
        return res.status(404).json({msg:'Post not found'})

        //check if the post has already been liked by user
        if(post.likes.filter(like => like.user.toString()===req.user.id).length > 0){
            const removeIndex = post.likes.map( like => like.user.toString()).indexOf(req.user.id)
            post.likes.splice(removeIndex, 1)
            await post.save()
            return res.json({likes: post.likes, unlikes: post.unlikes})
        }

        post.likes.unshift({user: req.user.id})

        if(post.unlikes.filter(unlike => unlike.user.toString()===req.user.id).length > 0){
            const removeIndex = post.unlikes.map( unlike => unlike.user.toString()).indexOf(req.user.id)
            post.unlikes.splice(removeIndex, 1)
        }

        

        await post.save()

        res.json({likes: post.likes, unlikes: post.unlikes})
        
    } catch (err) {
        console.error(err.message)
        if(err.kind === 'ObjectId')
             return res.status(404).json({msg:'Post not found'})
        res.status(500).send('server error')
    }
})

//@route PUT api/posts/unlike/:id
//desc   unlike a post
//access  private
router.put('/unlike/:id',auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post)
        return res.status(404).json({msg:'Post not found'})

        //check if the post has already been unliked by user
        if(post.unlikes.filter(unlike => unlike.user.toString()===req.user.id).length > 0){
            const removeIndex = post.unlikes.map( unlike => unlike.user.toString()).indexOf(req.user.id)
            post.unlikes.splice(removeIndex, 1)
            await post.save()
            return res.json({likes: post.likes, unlikes: post.unlikes})
        }

        post.unlikes.unshift({user: req.user.id})

        if(post.likes.filter(like => like.user.toString()===req.user.id).length > 0){
            const removeIndex = post.likes.map( like => like.user.toString()).indexOf(req.user.id)
            post.likes.splice(removeIndex, 1)
        }

        

        await post.save()

        res.json({likes: post.likes, unlikes: post.unlikes})
        
    } catch (err) {
        console.error(err.message)
        if(err.kind === 'ObjectId')
             return res.status(404).json({msg:'Post not found'})
        res.status(500).send('server error')
    }
})

// @route   Post api/posts/comment/:id
// @desc    comment on post with id given
// @access  Private
router.post('/comment/:id',[auth, [
    check('text','text is required').not().isEmpty()
]],async(req,res)=> {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try{
        const user= await User.findById(req.user.id).select('-password');
        const userProfile= await Profile.findOne({user: req.user.id});
        const post=await Post.findById(req.params.id).populate('comments');

        //check if the post exists
        if(!post){
            res.status(400).json({msg: "post doesnt exist!"});
        }
        //make new comment
        const newComment=new Comment({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
            post: req.params.id,
        });
        //save the commemt
        const comment=await newComment.save();
        post.comments.unshift(comment);
        userProfile.contributions.unshift({comment: comment._id});
        await userProfile.save();
        await post.save();
        res.json(post);//what do i return again solly
    }catch(e){
        console.log(e.message);
        res.status(500).send('Server Error');
    }

});

// @route   delete api/posts/comment/:id/:comment_id
// @desc    deleting a comment on post with id given
// @access  Private
router.delete('/comment/:id/:comment_id',auth,async(req,res)=>{
    try{
        //find the user
        const profile = await Profile.findOne({ user: req.user.id});

        //find the post
        const post=await Post.findById(req.params.id);

        //find the required comment
        const comment=await Comment.findById(req.params.comment_id);

        //check if the post exists
        if(!post){
            res.status(400).json({msg: "post doesnt exist!"});
        }
        //make sure comment exist
        if(!comment){
            return res.status(404).json({msg: "comment doesnt exist!"});
        }

        //check if current user is owner of the comment
        if(comment.user.toString() !== req.user.id && req.user.id !== post.user.toString()){
            return res.status(401).json({msg: "user not authorized"}); 
        }

        //get remove index
        const removeIndex=post.comments.map(commentId => commentId.toString()).indexOf(req.params.comment_id);
        if(removeIndex<0){
            return res.status(404).json({msg: "comment doesnt exist!"});
        }
        //remove that comment
        post.comments.splice(removeIndex, 1);
        if(profile.contributions.filter(comment => comment.comment.toString() === req.params.comment_id) > 0){
            const removalIndex = profile.contributions.map(comment => comment.comment.toString()).indexOf(req.params.comment_id)
            profile.contributions.splice(removalIndex, 1)
        }

        await post.save();
        await comment.remove();
        await profile.save();
        res.json({});//what to return? krdia ab solly
    }catch(e){
        console.log(e.message);
        res.status(500).send('Server Error');
    }
});



//@route PUT api/posts/comment/like/:id/:comment_id
//desc   like a comment on a post
//access  private
router.put('/comment/like/:id/:comment_id',auth, async (req, res) => {
    try {
        //find the post
        const post = await Post.findById(req.params.id)

        //make sure the post exists
        if(!post){
         return res.status(404).json({msg:'Post not found'})
        }

        //find the required comment
        const comment=await Comment.findById(req.params.comment_id);

        //make sure the comment exists
        if(!comment){
            return res.status(404).json({msg:'Comment does not exist'})
        }

        //check if comment belongs to the post
        const Index=post.comments.map(commentId => commentId.toString()).indexOf(req.params.comment_id);
        if(Index<0){
            return res.status(404).json({msg: "comment doesnt exist!"});
        }

        //check if the comment has already been liked by user
        if(comment.likes.filter(like => like.user.toString()===req.user.id).length > 0){
            const removeIndex = comment.likes.map( like => like.user.toString()).indexOf(req.user.id)
            comment.likes.splice(removeIndex, 1)
            await comment.save();

            return res.json(comment);
        }

        comment.likes.unshift({user: req.user.id})

        if(comment.unlikes.filter(unlike => unlike.user.toString()===req.user.id).length > 0){
            const removeIndex = comment.unlikes.map( unlike => unlike.user.toString()).indexOf(req.user.id)
            comment.unlikes.splice(removeIndex, 1)
        }
        await comment.save();

        res.json(comment);
        
    } catch (err) {
        console.error(err.message)
        if(err.kind === 'ObjectId')
            return res.status(404).json({msg:'Comment does not exist'})
        res.status(500).send('server error')
    }
})

//@route PUT api/posts/comment/unlike/:id/:comment_id
//desc   unlike a comment on a post
//access  private
router.put('/comment/unlike/:id/:comment_id',auth, async (req, res) => {
    try {
        //find the post
        const post = await Post.findById(req.params.id)

        //make sure the post exists
        if(!post){
         return res.status(404).json({msg:'Post not found'})
        }

        //find the required comment
        const comment=await Comment.findById(req.params.comment_id);

        //make sure the comment exists
        if(!comment){
            return res.status(404).json({msg:'Comment does not exist'})
        }

        //check if comment belongs to the post
        const Index=post.comments.map(commentId => commentId.toString()).indexOf(req.params.comment_id);
        if(Index<0){
            return res.status(404).json({msg: "comment doesnt exist!"});
        }

        //check if the comment has already been unliked by user
        if(comment.unlikes.filter(unlike => unlike.user.toString()===req.user.id).length > 0){
            const removeIndex = comment.unlikes.map( unlike => unlike.user.toString()).indexOf(req.user.id)
            comment.unlikes.splice(removeIndex, 1)
            await comment.save();

            return res.json(comment)
        }

        comment.unlikes.unshift({user: req.user.id})

        if(comment.likes.filter(like => like.user.toString()===req.user.id).length > 0){
            const removeIndex = comment.likes.map( like => like.user.toString()).indexOf(req.user.id)
            comment.likes.splice(removeIndex, 1)
        }
        await comment.save();

        res.json(comment)
        
    } catch (err) {
        console.error(err.message)
        if(err.kind === 'ObjectId')
            return res.status(404).json({msg:'Comment does not exist'})
        res.status(500).send('server error')
    }
})

router.put('/comment/approve/:id/:comment_id', auth, async(req, res) => {
    try{
        //find the post
        const post = await Post.findById(req.params.id)

        //make sure the post exists
        if(!post){
         return res.status(404).json({msg:'Post not found'})
        }

        //find the required comment
        const comment=await Comment.findById(req.params.comment_id);
        // console.log(comment);
        //make sure the comment exists
        if(!comment){
            return res.status(404).json({msg:'Comment does not exist'})
        }

         //check if current user is owner of the comment
         if(req.user.id !== post.user.toString()){
            return res.status(401).json({msg: "user not authorized"}); 
        }

        const user = await User.findById(comment.user.toString());
        if(!user.type_of)
        user.rating = user.rating + 5;

         //get remove index
         const approveIndex=post.comments.map(commentId => commentId.toString()).indexOf(req.params.comment_id);
         if(approveIndex<0){
             return res.status(404).json({msg: "comment doesnt exist!"});
         }

         comment.approval = true;
         await user.save();
         await comment.save();
         await post.save();

         res.json({});


    }catch(e){
        console.log(e.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router