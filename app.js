const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./Auth/AuthRoutes.js");
const userRoutes = require("./API/User/UserRoutes.js");
const flatRoutes = require("./API/Flat/FlatRoutes.js");
const messageRoutes = require("./API/Message/MessageRoutes.js");

dotenv.config();

const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use("/users", authRoutes);
app.use("/users", userRoutes);
app.use("/flats", flatRoutes);
app.use("/flats", messageRoutes);

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
