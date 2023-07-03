const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QabulData = new Schema({
  title_uz: String,
  title_ru: String,
  title_en: String,
  body_uz: String,
  body_ru: String,
  body_en: String,
  file: Array,
  faq: Array ,
  nameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QabulName",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const QabulName = new Schema({
  title_uz: String,
  title_ru: String,
  title_en: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

const QabulDataSchema = mongoose.model(
  "QabulData",
  QabulData
);
const QabulNameSchema = mongoose.model(
  "QabulName",
  QabulName
);

module.exports = { QabulDataSchema, QabulNameSchema };
