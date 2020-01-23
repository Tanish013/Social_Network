const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser=require('body-parser');
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
const cors = require("cors");
dotenv.config();

//db
//MONGO_URI=mongodb://localhost/nodeapi
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Connection established");
})

mongoose.connection.on('error',err => {
    console.log(`DB connection error:${err.message}`);
});

//bring in routes
const postRoutes = require('./routes/post')
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")


//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())
app.use(expressValidator());
app.use('/',authRoutes); // signin, signup

// Functional routes
app.use('/',postRoutes); // generate post 
app.use('/',userRoutes); // user search, edit user
app.use(function (err, req, res, next) {
    if (err.name === 'Unauthorized Error') {
      res.status(401).json({error:"Unauthorized!!"});
    }
  });


const port =process.env.PORT || 1111;

app.listen(port,() => {
    console.log(`A Node JS api is listening on port: ${port}`)
});