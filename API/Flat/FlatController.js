const Flat = require("./FlatModel.js");

// Get all flats
exports.getFlats = async (req, res) => {
  try {
    const flats = await Flat.find();
    res.status(201).send(flats);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Server error please try again later", error: err });
  }
};

// Get flat by id
exports.getFlatById = async (req, res) => {
  try {
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
    } = req.body;

    if (
      !city ||
      !streetName ||
      !streetNo ||
      !areaSize ||
      !yearBuilt ||
      !rentPrice ||
      !dateAvailable
    ) {
      return res.status(400).send("All fields are required");
    }

    const newFlat = new Flat(
      city,
      streetName,
      streetNo,
      areaSize,
      yearBuilt,
      rentPrice,
      dateAvailable
    );
    await newFlat.save();
    res.status(201).send({ message: "Flat added", newFlat });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Server error please try again", error: err });
  }
};

// Update flat by id
exports.updateFlatById = async (req, res) => {
  try {
    const {
      city,
      streetName,
      streetNo,
      areaSize,
      yearBuilt,
      rentPrice,
      dateAvailable,
    } = req.body;

    const flat = await Flat.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          city,
          streetName,
          streetNo,
          areaSize,
          yearBuilt,
          rentPrice,
          dateAvailable,
        },
      },
      { new: true, runValidators: true }
    );

    if (!flat) {
      res.status(404).send("Flat not found");
    }
    res.status(201).send({ message: "Flat updated", flat });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Server error please try again later", error: err });
  }
};

// Delete flat
exports.deleteFlat = async (req, res) => {
  try {
    await Flat.findOneAndDelete({ _id: req.params.id });
    res.status(201).send({ message: "Flat deleted" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Server error please try again later", error: err });
  }
};
