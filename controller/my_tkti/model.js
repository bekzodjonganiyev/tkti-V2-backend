const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MyTktiData = new Schema({
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
    ref: "MyTktiName",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const MyTktiName = new Schema({
  title_uz: String,
  title_ru: String,
  title_en: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

const MyTktiDataSchema = mongoose.model(
  "MyTktiData",
  MyTktiData
);
const MyTktiNameSchema = mongoose.model(
  "MyTktiName",
  MyTktiName
);

module.exports = { MyTktiDataSchema, MyTktiNameSchema };
