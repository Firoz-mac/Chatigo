const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
    seen: {
      type: Boolean,
      default: false,
    },
    delivered: {
      type: Boolean,
      default : false,
    },
    seen: {
      type: Boolean,
      default : false,
    },
    fileUrl:{
      type: String,
    },
    fileType:{
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", messageSchema);