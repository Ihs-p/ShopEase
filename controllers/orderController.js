const Cart = require('../models/cart');
const Order = require('../models/Order');

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    const cartItems = await Cart.find({ user: req.session.user._id }).populate('product');

    
        if (!cartItems.length) {
            return res.status(400).send('Your cart is empty.');
        }
      
        const totalAmount = cartItems.reduce((total, item) => {
          return total + item.product.price * item.quantity;
      }, 0);

      const order = new Order({
        user:req.session.user?._id,
        products:cartItems.map( (item) => {
          return {
            product:item.product._id,
            quantity:item.quantity
          }
        }),
        address : {
          name,
          address,
          phone,

        },
        totalAmount,
        status: 'pending',
      })


    // const order = new Order(req.body);
    await order.save();

    await Cart.deleteMany({ user: req.session.user._id });

    res.redirect('/orders')
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({user:req.session.user?._id}).populate('products.product').sort({ createdAt: -1 });
    console.log(orders);
    
    res.status(200).render("order",{orders});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('customerId').populate('products.productId');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Order Status
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
