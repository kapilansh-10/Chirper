const jwt = require("jsonwebtoken")

module.exports = function(req, res, next) {
    // get the token from request header
    const token = req.header('x-auth-token')

    if(!token){
        return res.status(404).json({ message: 'No token, authorization denied' })
    }

    // verify token
    try {
        const decoded = jwt.verify(token, process.env, JWT_SECRET);

        // add the user's  id from the token payload to the request object
        req.user = decoded.user;

        // call next() to proceed to the actual handler
        next()
    } catch (error) {
        res.status(401).json({ message: "Token is invalid" })
    }
}