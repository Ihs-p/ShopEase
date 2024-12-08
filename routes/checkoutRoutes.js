const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const verifyLogin = require('../middlewares/verifyLogin');

router.get('/', verifyLogin, checkoutController);

module.exports = router;