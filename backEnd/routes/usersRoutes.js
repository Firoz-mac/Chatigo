const express = require('express');
const router = express.Router();

const {searchUsers} = require('../controllers/userControllers');
const routeProtection = require('../middlewares/routeProtection');

router.get('/searchUsers', routeProtection, searchUsers);

module.exports=router;