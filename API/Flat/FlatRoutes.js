const express = require("express");
const flatRouter = express.Router();
const flatController = require("./FlatController.js");

// Temporary placeholder functions
flatRouter.get("/", flatController.getFlats);
flatRouter.get("/:id", flatController.getFlatById);
flatRouter.post("/", flatController.addFlat);
flatRouter.patch("/:id", flatController.upadteFlatById);
flatRouter.delete("/:id", flatController.deleteFlat);

module.exports = flatRouter;
