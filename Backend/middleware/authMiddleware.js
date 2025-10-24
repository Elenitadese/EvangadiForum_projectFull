const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load secret from .env
const JWT_SECRET = process.env.JWT_SECRET; // Secret key for JWT verification

// Middleware to protect routes
async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization; // Get Authorization header

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify token
    req.user = { userid: decoded.userid, username: decoded.username }; // Attach user info
    next(); // Proceed to next middleware/route
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
