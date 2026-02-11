const jwt = require('jsonwebtoken');
const userModel=require('../models/userModel');
const bcrypt = require('bcryptjs');


//create account
const createAccount=async (req,res)=>{
    try{
        const {userName,email,password}=req.body;

        //basic Validation
        if(!userName || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        //hashing password
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);

        //creating  user
        const user= await userModel.create({userName,email,password:hashedPassword});

        if(user){
            res.status(201).json({
                success: true,                
                message: "Account created successfully",
                data:user
            });
        }
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

};

//login user
const login=async (req,res)=>{
    try{
        const {email,password}=req.body;

        //basic validation
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        //finding user
        const user=await userModel.findOne({email});

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        //compare password
        const isMatch=await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });
        }

        //Generate JWT token
        const token= jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRE}
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            data:user
        });

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports={createAccount,login};