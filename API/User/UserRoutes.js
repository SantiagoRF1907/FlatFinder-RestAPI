const express = require("express");
const userRouter = express.Router();
const userController = require("./UserController.js");

userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.patch("/", userController.update);
userRouter.delete("/", userController.deletUserById);
userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);

module.exports = userRouter;
