const jwt = require("jsonwebtoken");
const User = require("../API/User/UserModel.js");

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from request headers
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = { id: decoded.id };

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    res.status(401).json({ message: "Invalid token, authentication failed" });
  }
};

module.exports = authMiddleware;
