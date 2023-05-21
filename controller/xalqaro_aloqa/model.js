const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const XalqaroAloqaData = new Schema({
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
    ref: "XalqaroAloqaName",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const XalqaroAloqaName = new Schema({
  title_uz: String,
  title_ru: String,
  title_en: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

const XalqaroAloqaDataSchema = mongoose.model(
  "XalqaroAloqaData",
  XalqaroAloqaData
);
const XalqaroAloqaNameSchema = mongoose.model(
  "XalqaroAloqaName",
  XalqaroAloqaName
);

module.exports = { XalqaroAloqaDataSchema, XalqaroAloqaNameSchema };
