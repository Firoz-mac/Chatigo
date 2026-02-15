const express = require('express');
const router = express.Router();

const routeProtection = require('../middlewares/routeProtection');
const {getUserConversations} = require('../controllers/conversationControllers')

router.get('/', routeProtection, getUserConversations);  

module.exports=router;