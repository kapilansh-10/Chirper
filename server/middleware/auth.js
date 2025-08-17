const jwt = require("jsonwebtoken")

module.exports = function(req, res, next) {
    // get the token from the "Authorization" header
    const authHeader = req.header('Authorization')

    // Check if the header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No token, authorization denied"})
    }

    // verify token
    try {
        // Get the actual token by removing "Bearer " from the start
        const token = authHeader.substring(7);

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // add the user's  id from the token payload to the request object
        req.user = decoded.user;

        // call next() to proceed to the actual handler
        next()
    } catch (error) {
        res.status(401).json({ message: "Token is invalid" })
    }
}