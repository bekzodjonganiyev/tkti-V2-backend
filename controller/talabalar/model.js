const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TalabalarData = new Schema({
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
    ref: "TalabalarName",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const TalabalarName = new Schema({
  title_uz: String,
  title_ru: String,
  title_en: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

const TalabalarDataSchema = mongoose.model(
  "TalabalarData",
  TalabalarData
);
const TalabalarNameSchema = mongoose.model(
  "TalabalarName",
  TalabalarName
);

module.exports = { TalabalarDataSchema, TalabalarNameSchema };
