const express = require('express');
const router = express.Router();

const {createAccount} = require('../controllers/authControllers');
const usersEmailOrUserNameIsExisting = require('../middlewares/usersEmailOrUserNameIsExisting');

router.post('/register', usersEmailOrUserNameIsExisting, createAccount);

module.exports=router;