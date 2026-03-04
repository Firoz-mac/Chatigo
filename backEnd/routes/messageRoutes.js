const express = require('express');
const router = express.Router();

const routeProtection = require('../middlewares/routeProtection');
const upload = require("../middlewares/upload");
const { sendMessage, getMessages, markAsRead, markMessagesAsSeen } = require("../controllers/messageController");

router.post("/send", routeProtection, upload.single("file"), sendMessage);
router.get("/:conversationId", routeProtection, getMessages);
router.put("/read/:conversationId", routeProtection, markAsRead);
router.put("/seen/:conversationId", routeProtection, markMessagesAsSeen);

module.exports = router;