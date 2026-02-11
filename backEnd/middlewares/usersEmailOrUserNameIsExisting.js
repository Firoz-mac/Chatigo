const userModel=require('../models/userModel');

const usersEmailOrUserNameIsExisting= async (req,res,next)=>{
    try{
        const {userName,email}=req.body;

        //email checking

        const emailExist= await userModel.findOne({email});
        if(emailExist){
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        //userName checking
        const userNameExist= await userModel.findOne({userName});
        if(userNameExist){
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            });
        }

        next();
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
    
};

module.exports=usersEmailOrUserNameIsExisting;