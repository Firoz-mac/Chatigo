const express = require('express');
const router = express.Router();

const routeProtection = require('../middlewares/routeProtection');
const { sendMessage, getMessages } = require("../controllers/messageController");

router.post("/send", routeProtection, sendMessage);
router.get("/:conversationId", routeProtection, getMessages);

module.exports = router;