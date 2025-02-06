const express = require("express");
const messageRouter = express.Router();
const messageController = require("./MessageController");

messageRouter.get("/:id/messages", messageController.getMessages);
messageRouter.get("/:id/messages/:senderId", messageController.getUserMessages);
messageRouter.post("/:id/messages", messageController.addMessage);

module.exports = messageRouter;
