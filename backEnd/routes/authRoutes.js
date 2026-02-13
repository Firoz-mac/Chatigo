const express = require('express');
const router = express.Router();

const {createAccount} = require('../controllers/authControllers');
const {login} = require('../controllers/authControllers');
const usersEmailOrUserNameIsExisting = require('../middlewares/usersEmailOrUserNameIsExisting');
const {getLoggedUserData} = require('../controllers/authControllers');
const routeProtection = require('../middlewares/routeProtection');

router.post('/register', usersEmailOrUserNameIsExisting, createAccount);
router.post('/login', login);
router.get('/userData', routeProtection, getLoggedUserData);

module.exports=router;