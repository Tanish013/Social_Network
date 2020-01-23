const express = require('express')
const {getPosts,createPost} =require('../controllers/post')
const {requireSignin} =require('../controllers/auth')
const {userById} =require('../controllers/user')
const {createPostValidator} = require('../validator')

const router =express.Router()

router.get('/',requireSignin,getPosts)
router.post('/post/new/:userId',requireSignin,createPostValidator,createPost)

//any routes containing userid, our app will first exexute userById() 
router.param("userId",userById)

module.exports = router
