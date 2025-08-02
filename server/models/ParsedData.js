const parsedDataSchema = new mongoose.Schema({
  data: Array,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fileName: String,
});

module.exports = mongoose.model("ParsedData", parsedDataSchema);
