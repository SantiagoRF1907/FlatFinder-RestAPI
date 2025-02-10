const express = require("express");
const userRouter = express.Router();
const userController = require("./UserController.js");
const authMiddleware = require("../../Auth/AuthMiddleware.js");

userRouter.get("/", authMiddleware, userController.getUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.patch("/:id", authMiddleware, userController.updateUserById);
userRouter.delete("/:id", authMiddleware, userController.deleteUserById);

module.exports = userRouter;
