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

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "An error ocurred when loging in", error: err });
  }
};

// User Registration
exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, birthDate } = req.body;

    if (!email || !password || !firstName || !lastName || !birthDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 2);
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      birthDate,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error, please try again later", error: err });
  }
};
