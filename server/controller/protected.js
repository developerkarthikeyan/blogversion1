const User = require("../model/usermodel");
const jwt = require("jsonwebtoken");

const protectedRoute = async (req, res, next) => {
    try {
        // Extract token from cookies
        const token = req.cookies.token;
console.log(token); 
        if (!token) {
            return res.status(405).json({ message: "No token provided" });
        }

        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by ID
        const user = await User.findById(decoded.id);
        console.log(user)
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
res.status(200).json({message:"validated success fully"});
        // User is authenticated
        req.user = user; // Optionally attach user to request object
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = { protectedRoute };
