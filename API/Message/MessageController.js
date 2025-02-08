const Message = require("./MessageModel.js");

// Add message
exports.addMessage = async (req, res) => {
  try {
    // Ensure authenticated user ID is available
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User ID not found" });
    }

    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Message content is required" });
    }

    // Create new message
    const newMessage = new Message({
      content,
      flatId: req.params.id,
      senderId: req.user.id,
    });
    await newMessage.save();

    res.status(201).json({ message: "Message sent", newMessage });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error, please try later", error: err.message });
  }
};

// Get messages by sender id
exports.getUserMessages = async (req, res) => {
  try {
  } catch (err) {
    res
      .status(500)
      .send({ message: "Server error please try later", error: err });
  }
};

// Get all messages
