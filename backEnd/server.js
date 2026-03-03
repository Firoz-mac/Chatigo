require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors= require("cors");

const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
app.use(express.json());
connectDB();

app.use(cors({
  origin:process.env.CLIENT_URL,
  credentials: true
}));

//routes

const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const messageRoutes= require('./routes/messageRoutes');

//models
const Message = require('./models/messageModel');

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/conversations', conversationRoutes);
app.use("/messages", messageRoutes);


//socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

//io accessible in cotrollers
app.set("io",io);
const onlineUsers = new Map();

io.on("connection", (socket)=>{
  console.log("User connected:", socket.id);

  socket.on("join", (userId)=>{
    socket.join(userId);
    onlineUsers.set(userId, socket.id);
    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    console.log("Online users:", Array.from(onlineUsers.keys()));
    console.log(`User ${userId} Joined their room`);
  });

  socket.on("typing", ({ senderId, receiverId})=>{
    io.to(receiverId).emit("userTyping", senderId);
  });

  socket.on("stopTyping", ({senderId, receiverId})=>{
    io.to(receiverId).emit("userStopTyping", senderId);
  });

  socket.on("messageDelivered", async ({messageId})=>{
    const message = await Message.findByIdAndUpdate(
      messageId,
      {delivered:true},
      {new:true}
    );

    if(message){
      io.to(message.sender.toString()).emit("messageDeliveredUpdate", {
        messageId,
      });
    }
  })

  socket.on("disconnect", ()=>{
    for(let [userId, socketId] of onlineUsers.entries()){
      if(socketId===socket.id){
        onlineUsers.delete(userId);
        break;
      }
    }

    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    console.log("User disconnected:", socket.id);
  });

});

server.listen(process.env.PORT, ()=>{
  console.log(`Server running on port ${process.env.PORT}`);
});

