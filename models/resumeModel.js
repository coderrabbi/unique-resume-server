const mongoose = require("mongoose");

const resumeTemplateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fname: {
    type: String,
    default: "",
  },
  lname: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  jobTitle: {
    type: String,
    default: "",
  },
  education: {
    type: Array,
    default: [],
  },
  employmentHistory: {
    type: Array,
    default: [],
  },
  websites: {
    type: Array,
    default: [],
  },
  skills: {
    type: Array,
    default: [],
  },
  hobbies: {
    type: String,
    default: "",
  },
  references: {
    type: Array,
    default: [],
  },
  internShips: {
    type: Array,
    default: [],
  },
  languages: {
    type: Array,
    default: [],
  },
  professionalSummary: {
    type: String,
    default: "",
  },
  mobileNumber: {
    type: String,
    default: "",
  },
});

const ResumeTemplate = mongoose.model("ResumeTemplate", resumeTemplateSchema);
module.exports = ResumeTemplate;
