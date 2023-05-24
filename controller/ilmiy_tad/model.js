const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IlmiyTadData = new Schema({
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
    ref: "IlmiyTadName",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const IlmiyTadName = new Schema({
  title_uz: String,
  title_ru: String,
  title_en: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

const IlmiyTadDataSchema = mongoose.model(
  "IlmiyTadData",
  IlmiyTadData
);
const IlmiyTadNameSchema = mongoose.model(
  "IlmiyTadName",
  IlmiyTadName
);

module.exports = { IlmiyTadDataSchema, IlmiyTadNameSchema };
