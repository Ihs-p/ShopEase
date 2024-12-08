// controllers/cartController.js
const Cart = require("../models/cart");
const Product = require("../models/Product");

exports.getAllCarts = async (req, res) => {
  try {
    const cartItems = await Cart.find({user:req.session.user?._id}).populate({
      path: 'product',
      populate: {
        path: 'category', // Populate the category inside the product
        model: 'Category',
      },
    });
  
     // Calculate total amount
     const totalAmount = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
   
    res.status(200).render("cart", { cartItems,totalAmount  });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

exports.addCart = async (req, res) => {
  try {
    console.log(req.body);
    
      const { productId, quantity } = req.body;
      const userId = req.session.user?._id;

      if (!userId) {
          return res.status(401).json({ success: false, message: "User not logged in" });
      }

      const ExistingItem = await Cart.findOne({ product: productId, user: userId });

      if (ExistingItem) {
          ExistingItem.quantity += quantity;
          await ExistingItem.save();
          return res.status(200).json({ success: true, message: "Cart updated successfully" });
      } else {
          const cart = new Cart({
              product: productId,
              user: userId,
              quantity: quantity,
          });
          await cart.save();
          return res.status(201).json({ success: true, message: "Item added to cart successfully" });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Error adding product to cart" });
  }
};

// Update item quantity
exports.updateQuantity = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findById(itemId);
    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Remove item from cart
exports.removeItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const result = await Cart.findByIdAndDelete(itemId);
    if (result) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
