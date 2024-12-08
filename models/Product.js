const  mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: String,
    thumbnail: String,
    isActive: { type: Boolean, default: true },
  });

  
  module.exports = mongoose.model('Product', productSchema);  