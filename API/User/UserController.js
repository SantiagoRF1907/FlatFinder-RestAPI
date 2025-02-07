const User = require("./UserModel.js");

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get user by id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.status(404).send("User not found");
    }
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send({ message: "Error when finding product", error: err });
  }
};

// Update user
exports.updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const { email, password, firstName, lastName, birthDate, isAdmin } =
      req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { $set: { email, password, firstName, lastName, birthDate, isAdmin } },
      { new: true, runValidators: true }
    );
  } catch (err) {
    res
      .status(500)
      .send({ message: "An error ocurred when updating user: ", error: err });
  }
};

// Delete User
exports.deleteUserById = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send({ message: "User deleted" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "An error ocurred when deleting user: ", error: err });
  }
};
