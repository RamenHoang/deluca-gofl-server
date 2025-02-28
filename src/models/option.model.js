const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true } // Ví dụ: "Màu sắc", "Kích thước"
});

module.exports = mongoose.model("Option", OptionSchema);