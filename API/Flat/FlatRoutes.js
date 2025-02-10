const express = require("express");
const flatRouter = express.Router();
const flatController = require("./FlatController.js");
const { authMiddleware } = require("../../Auth/AuthMiddleware.js");

// Temporary placeholder functions
flatRouter.get("/", authMiddleware, flatController.getFlats);
flatRouter.get("/:id", authMiddleware, flatController.getFlatById);
flatRouter.post("/", authMiddleware, flatController.addFlat);
flatRouter.patch("/:id", authMiddleware, flatController.updateFlatById);
flatRouter.delete("/:id", authMiddleware, flatController.deleteFlat);

module.exports = flatRouter;
