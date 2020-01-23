const jwt = require('jsonwebtoken');//passport-jwt
require('dotenv').config()
const expressJwt = require('express-jwt');
const User = require("../models/user");

exports.signup = async (req,res) => {
    const userExists = await User.findOne({email: req.body.email})
    const sameuserName = await User.findOne({userName: req.body.userName});
    if(userExists) return res.status(403).json({
        error: "User with same email already exist"
    })
    if(sameuserName) return res.status(403).json({
        error:"Person with same username is already there"
    })
    const user = await new User(req.body)
    await user.save()
    res.status(200).json({message:'user created Successfully!! Please Login'})
};

exports.signin = (req,res) => {
    //find user based on email
    const {email,password} = req.body
    User.findOne({email},(err,user) =>{
        //if err or no user
        if(err || !user){
            return res.status(401).json({
                error: "User with that email doesnot exist. Please signup."
            });
        }
        // if user found make sure that email and password match
        // create authenticate mehtod in model and use here
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and password didn't match"
            });
        }
        //generate a token with user id and secret
        const token = jwt.sign(
            {_id:user._id,role:user.role},
            process.env.JWT_SECRET);
        //persist the token as 't' in cookie with expiry date
        res.cookie("t",token,{expire:new Date()+ 2000,httpOnly:true});
        //return response with user and token to frontend client
        const {_id,userName,name,email} = user
        return res.json({token,user:{_id,userName,email,name}});
    });
};


exports.signout = async (req,res) => {
    await res.clearCookie("t")
    return res.json({message:"signout success"});
};

exports.requireSignin = expressJwt({
    //if token valid ,express jwt append verified userid in an auth key to the request object
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});