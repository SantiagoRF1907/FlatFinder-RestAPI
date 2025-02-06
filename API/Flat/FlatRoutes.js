const express = require("express");
const flatRouter = express.Router();
const flatController = require("./FlatController");

flatRouter.get("/", flatController.getFlats);
flatRouter.patch("/", flatController.updateFlat);
flatRouter.delete("/", flatController.deleteFlat);
flatRouter.post("/", flatController.addFlat);
flatRouter.get("/:id", flatController.getFlatById);

module.exports = flatRouter;
