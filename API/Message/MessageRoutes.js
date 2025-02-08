const express = require("express");
const messageRouter = express.Router();
const messageController = require("./MessageController.js");
const authMiddleware = require("../../Auth/AuthMiddleware.js");

messageRouter.get(
  "/:id/messages",
  authMiddleware,
  messageController.getMessages
);
messageRouter.get(
  "/:id/messages/:senderId",
  authMiddleware,
  messageController.getUserMessages
);
messageRouter.post(
  "/:id/messages",
  authMiddleware,
  messageController.addMessage
);

module.exports = messageRouter;
