module.exports = (req, res, next) => {
    console.log("Checking user session:");  // Add a log to check the session data

    if (req.session.user) {
        return next();
    }

    console.log("User is not logged in. Redirecting to login.");
     res.redirect('/user/login');
};


