const mongoose = require("mongoose");
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

const createOrGetConversation = async (req, res) => {
  try {
    const senderId = req.user._id;
    let { receiverId } = req.body;

    if (!receiverId) {
      return res.status(400).json({
        success: false,
        message: "receiverId is required",
      });
    }

    receiverId = new mongoose.Types.ObjectId(receiverId);

    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("participants", "userName profileImg email");

    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],
      });

      conversation = await conversation.populate(
        "participants",
        "userName profileImg email"
      );
    }

    res.status(200).json({
      success: true,
      data: conversation,
    });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports={getUserConversations, createOrGetConversation};