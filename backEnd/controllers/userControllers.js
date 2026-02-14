const userModel=require('../models/userModel');

//search users in add chat
const searchUsers=async(req,res)=>{
    try{
        const userName=req.query.userName?.trim();
        if(!userName){
            return res.status(400).json({
                success: false,
                message: "userName is required"
            });
        }

        const loggedUserId=req.user.id;

        const users=await userModel.find({userName:{$regex: userName, $options: 'i'}, _id: {$ne: loggedUserId}}).limit(10);;

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports={searchUsers};