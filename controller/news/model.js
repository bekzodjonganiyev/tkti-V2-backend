const mongoose = require("mongoose");

const NewsSchema = mongoose.Schema({
  title_uz: String,
  title_ru: String,
  title_en: String,
  body_uz: String,
  body_ru: String,
  body_en: String,
  photo: String,
  category: String,
  date: String,
});

const News_data = mongoose.model("News", NewsSchema);

module.exports = { News_data };
