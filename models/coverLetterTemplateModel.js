const mongoose = require("mongoose");

const coverLetterTemplateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  personalDetails: {
    type: Array,
    default: [],
  },
  employerDetails: {
    type: Array,
    default: [],
  },
  letterDetails: {
    type: String,
    default: "",
  },
});

const CoverLetterTemplate = mongoose.model(
  "CoverLetterTemplate",
  coverLetterTemplateSchema
);
module.exports = CoverLetterTemplate;
