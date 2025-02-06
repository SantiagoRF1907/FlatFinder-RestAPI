const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../API/User/UserModel.js");

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (email === undefined || password === undefined) {
      res.status(400).send({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).send("Error login, err");
  }
};
