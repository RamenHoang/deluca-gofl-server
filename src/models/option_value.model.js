const mongoose = require("mongoose");

const OptionValueSchema = new mongoose.Schema({
  option: { type: mongoose.Schema.Types.ObjectId, ref: "Option", required: true },
  value: { type: String, required: true } // Ví dụ: "Đỏ", "Xanh", "S", "M"
});

module.exports = mongoose.model("OptionValue", OptionValueSchema);