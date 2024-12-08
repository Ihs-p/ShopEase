const mongoose = require('mongoose');

// Cart Schema
const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',  // Reference to the Product model
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1  // Cart quantity should be at least 1
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model (optional if you're supporting user accounts)
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

// Cart Model
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
