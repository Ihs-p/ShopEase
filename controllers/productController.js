const Product = require('../models/Product');

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('categoryId').populate('brandId');
    res.json(products);
      return products
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category').populate('brand');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    console.log(product);
    
    res.render('singleProduct',{product});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getProductsByCategory = async (req, res) => {
  const categoryId = req.params.id; // Assuming category ID is passed in the route

  try {
      const products = await Product.find() // Populate category if required
      const filteredProducts = products.filter((product) => product.category._id.toString() === categoryId);
      console.log(filteredProducts);
      
      res.render('categeryProducts', {products : filteredProducts });
  } catch (error) {
      console.error('Error fetching products by category:', error);
      res.status(500).send('Internal Server Error');
  }
};



// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
