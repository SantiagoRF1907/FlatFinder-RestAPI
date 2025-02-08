const express = require("express");
const flatRouter = express.Router();
const flatController = require("./FlatController.js");
const authMiddleware = require("../../Auth/AuthMiddleware.js");

// Temporary placeholder functions
flatRouter.get("/", flatController.getFlats);
flatRouter.get("/:id", flatController.getFlatById);
flatRouter.post("/", authMiddleware, flatController.addFlat);
flatRouter.patch("/:id", flatController.upadateFlatById);
flatRouter.delete("/:id", flatController.deleteFlat);

module.exports = flatRouter;
