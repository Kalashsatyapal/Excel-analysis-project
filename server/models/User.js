const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  uploadedFiles: [String], // ✅ must include this
});

module.exports = mongoose.model("User", userSchema);