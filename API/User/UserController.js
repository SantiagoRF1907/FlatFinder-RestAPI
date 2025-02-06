const User = require("./UserModel.js");

// Register User
exports.register = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.satus(201).send(newUser);
  } catch (err) {
    res.status(400).send("Register user error: ", err);
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === undefined) {
      res.status(400).send("Email is required");
    }
    if (password === undefined) {
      res.status(400).send("Password is required");
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).send("The email you've entered is incorrect");
    }
  } catch (err) {
    res.status(500).send("Error when login in", err);
  }
};
