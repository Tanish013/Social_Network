const Post = require('../models/post')
const formidable = require("formidable")
const fs = require('fs')//gives access to file system


exports.getPosts = (req,res) => {
   const posts = Post.find().select("_id title body")
   .populate("postedBy","_id name")
   .then((posts)=>{
       res.json({posts})
   })
   .catch((err)=>console.log(err))
}

exports.createPost = (req,res, next) =>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                err:"Image could not be uploaded"
            })
        }
        let post =new Post(fields);

        req.profile.hashed_password = undefined;
        req.profile.salt  = undefined;
        post.postedBy = req.profile
        
        if(files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.contentType = files.photo.type
        }
        post.save((err,result) => {
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            res.json(result)
        });
    });
    // const post =new Post(req.body);
    // // console.log("CREATING POST: ",req.body);
    // // post.save((err,result) => {
    // //     if(err){
    // //         return res.status(400).json({
    // //             error:err
    // //         })
    // //     }
    // //     res.status(200).json({
    // //         post: result
    // //     })
    // // })
    // post.save()
    // .then(result => {
    //     res.json({
    //         post:result
    //     });
    // });
};
