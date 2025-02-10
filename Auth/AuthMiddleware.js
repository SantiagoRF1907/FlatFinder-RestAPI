const jwt = require("jsonwebtoken");
const User = require("../API/User/UserModel.js"); // Import your User model

exports.authMiddleware = async (req, res, next) => {
  try {
    // Check if Authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to the request
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user; // Attach user to request
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token", error: err.message });
  }
};
