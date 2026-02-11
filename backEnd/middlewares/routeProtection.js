const jwt = require('jsonwebtoken');
const userModel=require('../models/userModel');

const routeProtection=async (req,res,next)=>{
    try{
        let token;

        //get token from header
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token=req.headers.authorization.split(' ')[1];
        }

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Not authorized, no token"
            });
        }

        //verify token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        //attach user to request
        req.user=await userModel.findById(decoded.id).select('-password');
        next();
    }catch(err){
        res.status(401).json({
            success: false,
            message: "Not authorized, token failed"
        });
    }
};
module.exports=routeProtection;