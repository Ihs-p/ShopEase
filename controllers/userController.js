const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const flash = require('connect-flash');
 



exports.getRegister = (req, res) => res.render('register',{error:"",value:{}})
exports.getLogin = (req, res) => res.render('login',{error:"",value:{}})

// Register a new user
exports.register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).render('register', { error: 'Passwords do not match',value:req.body });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).render('register', { error: 'Email already registered',value:req.body  });
        }

        // Create new user
        const user = new User({ name, email, password });
        await user.save();

        res.status(201).redirect('/user/login');
    } catch (error) {
        console.error(error);
        res.status(500).render('500', { error: 'Internal Server Error' });
    }
};

// Login an existing user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).render('login', { error: ' Email not found, please register' ,value:req.body});
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).render('login', { error: 'Invalid  password',value:req.body });
        }

        // Generate JWT token (optional if using sessions)
        // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // res.cookie('token', token, { httpOnly: true });
        req.session.user = user
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).render('500', { error: 'Internal Server Error' });
    }
};

// Logout user
exports.logout = (req, res) => {
    res.clearCookie('token');
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).send("Unable to log out");
        }
        // Clear the cookie if necessary
        res.clearCookie("connect.sid"); // replace with your cookie name if different
        res.redirect("/"); // redirect to login or another page after logout
    });
   
};
