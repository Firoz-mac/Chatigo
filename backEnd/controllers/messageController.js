const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");


// 🔹 Send Message
const sendMessage = async (req, res) => {
  try {
    const { conversationId, text } = req.body;
    const senderId = req.user._id;

    if (!conversationId || !text) {
      return res.status(400).json({
        success: false,
        message: "conversationId and text are required",
      });
    }

    // create message

    const message = await Message.create({
      conversation: conversationId,
      sender: senderId,
      text,
    });

    const io = req.app.get("io");

    // update last message in conversation and update unread messages count
    const conversation= await Conversation.findById(conversationId);

    //find receiver
    const receiverId=conversation.participants.find(
      (p)=>p.toString() !== senderId.toString()
    );

    // increase receiver unread count
    conversation.unreadCounts.set(
      receiverId.toString(),
      (conversation.unreadCounts.get(receiverId.toString()) || 0)+1
    );

    conversation.lastMessage=text;
    await conversation.save()

    //emit message to receiver room
    io.to(receiverId.toString()).emit("receiveMessage", message);

    res.status(201).json({
      success: true,
      data: message,
    });

  } catch (err) {
    console.log("SOCKET ERROR:",err)
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// 🔹 Get Messages
const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({
      conversation: conversationId,
    })
      .populate("sender", "userName profileImg")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      data: messages,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


//reset unread chat count when user opens chat
const markAsRead = async (req,res)=>{
    try{
        const { conversationId }=req.params;
        const userId = req.user._id;

        const conversation=await Conversation.findById(conversationId);
        conversation.unreadCounts.set(userId.toString(), 0);

        await conversation.save();
        res.status(200).json({ success:true });
    } catch (err){
      res.status(500).json({ success:false, message: err.message});
    }
};

module.exports = { sendMessage, getMessages, markAsRead };
