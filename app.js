// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');


const Product = require('./models/Product');

const categoryRoutes = require('./routes/categoryRoutes');
const brandRoutes = require('./routes/brandRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const ActiveCategories = require('./services/activeCategory');
const Cart = require('./models/cart');
const { getCartCount } = require('./services/getCartCount');


dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.set('view engine','ejs')







// Default route
app.get('/',async (req, res) => {
  try { 
    const user = req.session.user;
 
    const products = await Product.find().sort({price:-1});

    const categories = await ActiveCategories.getActiveCategories()
    
    // const cartItems = await Cart.find({user:user?._id})

    const cartCount = await  getCartCount(user?._id)
    
    
    res.render('home', { products,user,categories ,cartCount });

  } catch (error) {
    console.error(error);
    res.status(500).json({message:'Server Error'});
  }
});


// Routes
app.use('/product', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/brands', brandRoutes);
app.use('/cart', cartRoutes);
app.use('/checkout',checkoutRoutes );
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);




app.use((req, res, next) => {
  res.status(404).render('404');
});

// app.use((err, req, res, next) => {
//   console.error(err.stack);  // Log the error for debugging
//   res.status(500).render('500');
// });


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
