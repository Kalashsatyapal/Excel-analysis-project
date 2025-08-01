require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// 🌐 Middleware
app.use(cors());
app.use(express.json());

// 📦 Route Imports
app.use("/api/auth", require("./routes/auth"));
app.use("/api/protected", require("./routes/protected"));
app.use("/api/upload", require("./routes/upload"));

// 🛠 Validate Environment Variables
const requiredEnv = ["MONGO_URI", "PORT"];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required env variable: ${key}`);
    process.exit(1);
  }
});

// 🔗 Connect to MongoDB


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Exit on DB failure
  });
  

// 🏠 Root Route
app.get("/", (req, res) => {
  res.send("Server is live 🚀");
});

// 🧪 Optional: Dev-only logging
if (process.env.NODE_ENV === "development") {
  console.log("🧪 Running in development mode");
}
