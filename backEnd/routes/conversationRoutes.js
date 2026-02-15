const express = require('express');
const router = express.Router();

const routeProtection = require('../middlewares/routeProtection');
const {getUserConversations, createOrGetConversation} = require('../controllers/conversationControllers')

router.get('/', routeProtection, getUserConversations);  
router.post("/", routeProtection, createOrGetConversation);

module.exports=router;