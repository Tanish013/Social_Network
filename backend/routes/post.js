const express = require('express')
const {getPosts,createPost,postByUser,postById
,isPoster,deletePost,updatePost
} =require('../controllers/post')
const {requireSignin} =require('../controllers/auth')
const {userById} =require('../controllers/user')
const {createPostValidator} = require('../validator')

const router =express.Router()

router.get('/posts',requireSignin,getPosts)
router.post('/post/new/:userId',requireSignin,createPost,createPostValidator)
router.get('/post/by/:userId',requireSignin,postByUser);
router.delete('/post/:postId',requireSignin,isPoster, deletePost)
router.put('/post/:postId',requireSignin,isPoster, updatePost)
//any routes containing userid, our app will first exexute userById() 
router.param("userId",userById);
//any routes containing :postid, our app will first exexute postById() 
router.param("postId",postById);

module.exports = router
