const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema({
  title_uz: String,
  title_ru: String,
  title_en: String,
  title_ar: String,
  body_uz: String,
  body_ru: String,
  body_en: String,
  body_ar: String,
  category: {
    type: String,
    enum: ["a", "b"],
  },
});

module.exports = mongoose.model("Model", modelSchema);
