const express = require('express')
const {userById,allUsers,getUser,updateUser,deleteUser} =require('../controllers/user')
const {requireSignin} =require('../controllers/auth')
const router =express.Router()

router.get('/users',allUsers)
router.get('/users/:userId',requireSignin,getUser)
router.put('/users/:userId',updateUser)
router.delete('/users/:userId',deleteUser)
//any routes containing userid, our app will first exexute userById() 
router.param("userId",userById)

module.exports = router