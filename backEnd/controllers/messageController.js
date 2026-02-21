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

    // update last message in conversation
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: text,
    });

    const io = req.app.get("io");
    const conversation= await Conversation.findById(conversationId);

    const receiverId=conversation.participants.find(
      (p)=>p.toString() !== senderId.toString()
    );

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

module.exports = { sendMessage, getMessages };
