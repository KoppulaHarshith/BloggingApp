require("dotenv").config();

//required modules
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

//Declaring routes from routes folder
const userRouter = require("./routes/user");
const { checkForAuthCookie } = require("./middlewares/auth");
const blogRoute = require("./routes/blog");

const Blog = require('./models/blog');
const { url } = require("inspector");


//defining port and app
const app = express();
const port = process.env.PORT;

//mongodb connection
mongoose.connect(process.env.MONGO_URL).then(e => console.log('MongoDB connected'))

//setting view engine as ejs default for webpages
app.set('view engine','ejs');
//setting path of ejs files to be declared inside views folder by default
app.set('views',path.resolve("./views"));

//Important middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(checkForAuthCookie("token"));

//Rendering landing page use GET request method
app.get('/',async (req,res) => {
    const allBlogs = await Blog.find({});
    res.render('home',{
        user: req.user,
        blogs: allBlogs,
    });
});
//Using the methods from User router
app.use("/user",userRouter);
app.use("/blog",blogRoute);
//Server running on port 3000
app.listen(port,console.log("Server started",port));
