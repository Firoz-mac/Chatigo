const express = require('express');
const router = express.Router();

const routeProtection = require('../middlewares/routeProtection');
const { sendMessage, getMessages, markAsRead } = require("../controllers/messageController");

router.post("/send", routeProtection, sendMessage);
router.get("/:conversationId", routeProtection, getMessages);
router.put("/read/:conversationId", routeProtection, markAsRead);

module.exports = router;