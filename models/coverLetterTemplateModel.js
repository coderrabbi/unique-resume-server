const mongoose = require("mongoose");

const coverLetterTemplateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fullname: {
    type: String,
    default: "",
  },
  jobTitle: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  mobileNumber: {
    type: String,
    default: "",
  },
  companyName: {
    type: String,
    default: "",
  },
  hiringManagerName: {
    type: String,
    default: "",
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
