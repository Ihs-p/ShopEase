const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyLogin = require('../middlewares/verifyLogin');

router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id',verifyLogin, productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/category/:id', productController.getProductsByCategory);

module.exports = router;
