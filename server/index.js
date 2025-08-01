require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Constants
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/excel-project";

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/protected", require("./routes/protected"));

// Health route (optional, helpful for dev sanity checks)
app.get("/", (req, res) => res.send("🚀 Server is alive and kicking!"));

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`✅ Connected to MongoDB`);
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Exit with failure
  });
