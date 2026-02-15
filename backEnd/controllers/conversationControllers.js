const conversationModel= require('../models/conversationModel');

const getUserConversations= async(req,res)=>{
    try{
        const userId=req.user._id;

        const conversations = await conversationModel.find({
            participants: userId,
        })
        .populate({
            path:'participants',
            select: "userName profileImg email",
        })
        .sort({updatedAt:-1});


        res.status(200).json({
            success:true,
            count: conversations.length,
            data: conversations,
        });
    }catch(err){
        res.status(500).json({
            success:false,
            message: err.message,
        });
    }
};

module.exports={getUserConversations};