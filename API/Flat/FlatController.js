const Flat = require("./FlatModel.js");

// Get all flats
exports.getFlats = async (req, res) => {
  try {
    // Ensure user is logged in
    if (!req.user) {
      return res
        .status(403)
        .json({ message: "Unathorized, log in to see this information" });
    }
    const flats = await Flat.find();
    res.status(200).send(flats);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Server error please try again later", error: err });
  }
};

// Get flat by id
exports.getFlatById = async (req, res) => {
  try {
    // Ensure user is logged in
    if (!req.user) {
      return res
        .status(403)
        .json({ message: "Unathorized, log in to see this information" });
    }

    const flat = await Flat.findOne({ _id: req.params.id });
    if (!flat) {
      res.status(404).send("Flat not found");
    }
    res.status(201).send(flat);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Server error please try again later", error: err });
  }
};

// Add flat
exports.addFlat = async (req, res) => {
  try {
    const {
      city,
      streetName,
      streetNo,
      areaSize,
      yearBuilt,
      rentPrice,
      dateAvailable,
      hasAC = false,
    } = req.body;

    // Ensure authenticated user ID is available
    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User ID not found" });
    }

    // Validate required fields
    if (
      !city ||
      !streetName ||
      !streetNo ||
      !areaSize ||
      !yearBuilt ||
      !rentPrice ||
      !dateAvailable
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new flat
    const newFlat = new Flat({
      city,
      streetName,
      streetNo,
      areaSize,
      yearBuilt,
      rentPrice,
      dateAvailable,
      hasAC,
      ownerId: req.user._id,
    });

    await newFlat.save();

    res.status(201).json({ message: "Flat added successfully", newFlat });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error, please try again", error: err.message });
  }
};

// Update flat by id (only if the user is the owner)
exports.updateFlatById = async (req, res) => {
  try {
    // Find the flat by ID
    const flat = await Flat.findById(req.params.id);
    if (!flat) {
      return res.status(404).json({ message: "Flat not found" });
    }

    // Check if the logged-in user is the owner
    if (flat.ownerId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this flat" });
    }

    // Extract allowed fields for update
    const {
      city,
      streetName,
      streetNo,
      areaSize,
      hasAC,
      yearBuilt,
      rentPrice,
      dateAvailable,
    } = req.body;

    // Update the flat
    const updatedFlat = await Flat.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          city,
          streetName,
          streetNo,
          areaSize,
          hasAC,
          yearBuilt,
          rentPrice,
          dateAvailable,
        },
      },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ message: "Flat updated successfully", flat: updatedFlat });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error, please try again later", error: err });
  }
};

// Delete flat
exports.deleteFlat = async (req, res) => {
  try {
    // Find the flat by ID
    const flat = await Flat.findById(req.params.id);
    if (!flat) {
      return res.status(404).json({ message: "Flat not found" });
    }

    // Ensure authenticated user ID is available
    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User ID not found" });
    }

    // Check if the logged-in user is the owner
    if (flat.ownerId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this flat" });
    }

    // Delete the flat
    await Flat.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Flat deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Server error, please try again later",
      error: err.message,
    });
  }
};
