const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register route
router.get('/register', userController.getRegister);
router.post('/register', userController.register);

// Login route
router.get('/login',userController.getLogin);
router.post('/login', userController.login);

// Logout route
router.get('/logout', userController.logout);

module.exports = router;
