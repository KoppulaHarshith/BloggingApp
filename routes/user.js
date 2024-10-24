const {Router} = require('express');
const User = require('../models/user');
const router = Router();
const {createTokenForUser} = require("../service/auth")

router.get('/signin', (req,res) => {
    return res.render("signin");
});

router.get('/signup',(req,res) => {
    return res.render("signup");
});

router.post('/signin', async (req,res) => {
    const {Email,password} = req.body;
    try {
        const token =await User.matchPasswordAndGenerateToken(Email,password);
        return res.cookie("token",token).redirect("/");
    } catch (error) {
        return res.render('signin', {
            error: "Incorrect email or password"
        })
    }
});

router.post('/signup', async (req,res) => {
    const { Name, Email, password } = req.body;
    try {
        const existingUser = await User.findOne({ Email });
        if(existingUser)
        {
            return res.render("signup", {
                error:"An Account already exists with this email"
            })
        }
        const newUser = await User.create({
            Name,
            Email,
            password,
        });
        
        const token = createTokenForUser(newUser);
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        return res.render('signup', {
            error: "Failed to create an account"
        });
    }
})

router.get('/logout',(req,res) => {
    res.clearCookie('token').redirect('/');
})
module.exports = router