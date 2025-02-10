const messageRouter = require("../Message/MessageRoutes.js");
const User = require("./UserModel.js");

// Get all users
exports.getUsers = async (req, res) => {
  try {
    // Ensure user is admin
    if (!req.user || !req.user.isAdmin) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User is not admin" });
    }

    const users = await User.find();
    res.status(200).send(users);
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
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: "Error when finding product", error: err });
  }
};

// Update user
exports.updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Ensure user is acct owner or admin
    if (!(req.user.isAdmin || req.user.id === userId || req.user)) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    const { email, password, firstName, lastName, birthDate, isAdmin } =
      req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { $set: { email, password, firstName, lastName, birthDate, isAdmin } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).send({ message: "User updated", user: updatedUser });
  } catch (err) {
    res
      .status(500)
      .send({ message: "An error ocurred when updating user: ", error: err });
  }
};

// Delete User
exports.deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Ensure user is acct owner or admin
    if (!(req.user.isAdmin || req.user.id === userId || req.user)) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.send({ message: "User deleted" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "An error ocurred when deleting user: ", error: err });
  }
};
