const Cart = require("../models/cart");


const getCheckout = async (req,res)=>{
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
        res.status(200).render('checkout',{cartItems,totalAmount})
    } catch (error) {

        res.status(500).json({message:"internal server error"})
        
    }
}


module.exports = getCheckout