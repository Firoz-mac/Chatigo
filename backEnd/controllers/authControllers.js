const userModel=require('../models/userModel');
const bcrypt = require('bcryptjs');

const createAccount=async (req,res)=>{
    try{
        const {userName,email,password}=req.body;
        const user= await userModel.create({userName,email,password});
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

module.exports={createAccount};