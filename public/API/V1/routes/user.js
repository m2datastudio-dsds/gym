const express = require('express');
const UserController = require('../controllers/User/userController');

const router = express.Router();

router.post('/Login', UserController.login);

module.exports = router;
