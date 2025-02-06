const mongoose = require("mongoose");

const FlatSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      trim: true,
    },
    streetName: {
      type: String,
      required: true,
      trim: true,
    },
    streetNo: {
      type: Number,
      required: true,
      trim: true,
    },
    areaSize: {
      type: Number,
      required: true,
      min: 50,
    },
    hasAC: {
      type: Boolean,
      default: false,
    },
    yearBuilt: {
      type: Number,
      required: true,
      min: 1800,
    },
    rentPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    dateAvailable: {
      type: Date,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Flat = mongoose.model("Flat", FlatSchema);
module.exports = Flat;
