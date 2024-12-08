const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyLogin = require('../middlewares/verifyLogin');

router.post('/',verifyLogin, orderController.createOrder);
router.get('/',verifyLogin, orderController.getAllOrders);
router.get('/:id',verifyLogin, orderController.getOrderById);
router.put('/:id',verifyLogin, orderController.updateOrderStatus);
router.delete('/:id',verifyLogin, orderController.deleteOrder);

module.exports = router;
