const express = require('express');
const router = express.Router();

const routeProtection = require('../middlewares/routeProtection');
const { sendMessage, getMessages, markAsRead, markMessagesAsSeen } = require("../controllers/messageController");

router.post("/send", routeProtection, sendMessage);
router.get("/:conversationId", routeProtection, getMessages);
router.put("/read/:conversationId", routeProtection, markAsRead);
router.put("/seen/:conversationId", routeProtection, markMessagesAsSeen);

module.exports = router;