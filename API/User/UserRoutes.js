const express = require("express");
const userRouter = express.Router();
const userController = require("./UserController.js");

userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.patch("/:id", userController.updateUserById);
userRouter.delete("/:id", userController.deleteUserById);

module.exports = userRouter;
