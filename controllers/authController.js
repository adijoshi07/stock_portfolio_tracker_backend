const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register user
const registerUser = async(req, res) =>{
    try{
        const {name,email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message : "User already exists"
            });
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password,10);
        //create new user
        const newUser = await User.create({name, email, password : hashedPassword});
        res.status(201).json({
            message : "User registered successfully",
            User : {id : newUser._id,
                name : newUser.name,
                email : newUser.email
            }
        });
    }
    catch(error){
        res.status(500).json({
            message : "Server error",
            error : error.message
        });
    }
};
//login user
const loginUser = async(req,res) =>{
    try{
        const {email,password} = req.body;
        //check if user exists
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({
                message : "Invalid email or password"
            });
        }
        //compare password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch){
            return res.status(400).json({
                message : "Invalid email or password"
            });
        }
        //generate jwt token
        const token = jwt.sign({
            id : existingUser._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn : "7d"
        });
        res.status(200).json({
        message : "Login Successful",
        token,
        user : {
            id : existingUser._id,
            name : existingUser.name,
            email : existingUser.email}
        });
    }
    catch(error){
        res.status(500).json({
            message : "server error",
            error : error.message
        });
    }
};
module.exports = {registerUser, loginUser};



