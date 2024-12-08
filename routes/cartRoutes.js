// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const verifyLogin = require('../middlewares/verifyLogin');

// Update quantity
router.get('/',verifyLogin, cartController.getAllCarts);
router.post('/add',verifyLogin, cartController.addCart);
router.put('/update/:itemId',verifyLogin, cartController.updateQuantity);

// Remove item from cart
router.delete('/remove/:itemId',verifyLogin, cartController.removeItem);

module.exports = router;
