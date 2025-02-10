const Message = require("./MessageModel.js");

// Add message
exports.addMessage = async (req, res) => {
  try {
    // Find the flat by ID
    const flat = await Flat.findById(req.params.id);
    if (!flat) {
      return res.status(404).json({ message: "Flat not found" });
    }

    // Ensure authenticated user ID is available
    if (!req.user || !req.user._id) {
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
      senderId: req.user._id,
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
    // Find the flat by ID
    const flat = await Flat.findById(req.params.id);
    if (!flat) {
      return res.status(404).json({ message: "Flat not found" });
    }

    // Ensure user is sender
    if (!req.user || req.user._id !== req.params.senderId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to view these messages" });
    }

    const messages = await Message.find({
      flatId: req.params.id,
      senderId: req.user._id,
    });
    res.status(200).json({ messages });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Server error, please try later", error: err });
  }
};

// Get all messages
exports.getMessages = async (req, res) => {
  try {
    // Find the flat by ID
    const flat = await Flat.findById(req.params.id);
    if (!flat) {
      return res.status(404).json({ message: "Flat not found" });
    }

    // Check if the logged-in user is the owner
    if (flat.ownerId.toString() !== req.user._id) {
      return res.status(403).json({
        message: "You are not authorized to see this flat's messages",
      });
    }

    const messages = await Message.find();
    res.satus(200).send(messages);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error, please try later", error: err });
  }
};
