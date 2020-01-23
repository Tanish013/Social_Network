exports.createPostValidator = (req, res, next) =>{
    //title
    req.check('title','Write a title').notEmpty()
    req.check('title','Title must be between 4 to 150character').isLength({
        min:4,
        max:150
    });

    //body
    req.check('body','Write a title').notEmpty()
    req.check('body','body must be between 4 to 2000 character').isLength({
        min:4,
        max:2000
    });

    //check Errors
    const errors = req.validationErrors()
    //if error show the first one as they appear
    if(errors){
        const firstError = errors.map((errors) => errors.msg)[0]
        return res.status(400).json({error:firstError})
    }
    //proceed to next middleware
    next();
};

exports.userSignupValidator = (req, res, next) =>{
    //userName is not null 
    // req.check('userName','Username is required').notEmpty();
    //name is not null and between 4-16 characters
    req.check('name','Name is required').notEmpty();
    //email is not null, valid and normaized
    req.check('email','Email must be between 3 to 32')
    .matches(/.+\@.+\..+/)
    .withMessage('Email must contain @ ')
    .isLength({
        min: 4,
        max: 2000
    });
    //check for password
    req.check('password',"password is required").notEmpty();
    req.check('password')
    .isLength({min:6})
    .withMessage("Password must contain atleast 6 characters")
    .matches(/\d/)
    .withMessage("Password must cotain a number"); 
    //check for errors
    const errors = req.validationErrors()
    //if error show the first one as they appear
    if(errors){
        const firstError = errors.map((errors) => errors.msg)[0]
        return res.status(400).json({error:firstError})
    }
    //proceed to next middleware
    next();
}