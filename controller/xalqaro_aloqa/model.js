const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema({
  title_uz: String,
  title_ru: String,
  title_en: String,
  body_uz: String,
  body_ru: String,
  body_en: String,
});

module.exports = mongoose.model("Model", modelSchema);
