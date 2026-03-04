const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");


// 🔹 Send Message
const sendMessage = async (req, res) => {
  try {
    const { conversationId, text } = req.body;
    const senderId = req.user._id;
    const file=req.file;

    if (!conversationId) {
      return res.status(400).json({
        success: false,
        message: "conversationId is required",
      });
    }

    if(!text && !file){
      return res.status(400).json({
        success:false,
        message: "message must contain text or file",
      })
    }

    // create message

    const messageData = {
      conversation: conversationId,
      sender: senderId,
      text: text || "",
      delivered: false,
      seen: false,
    };

    if(file){
      messageData.fileUrl=`/uploads/${file.filename}`;
      messageData.fileType=file.mimetype;
    }

    const message= await Message.create(messageData);

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

    conversation.lastMessage=file? "🔗 File" : text;
    
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

//mark message seen when opens chat
const markMessagesAsSeen = async (req,res)=>{
  try{
    const{conversationId}=req.params;
    const userId=req.user._id.toString();
    
    await Message.updateMany(
      {
        conversation: conversationId,
        sender: {$ne:userId},
        read: false,
      },
      {
        read:true
      }
    );

    const conversation=await Conversation.findById(conversationId);
    if(conversation){
      conversation.unreadCounts.set(userId, 0);
      await conversation.save()
    }


    res.status(200).json({ success:true });
  }catch(err){
    console.log("read error", err)
    res.status(500).json({ success:false, message: err.message});
  }
}

module.exports = { sendMessage, getMessages, markAsRead, markMessagesAsSeen};
