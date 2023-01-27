const mongoose = require("mongoose");

const cvTemplateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  email: {
    type: String,
    default: "",
  },
  personalInformation: {
    type: Array,
    default: [],
  },
  professionalSummary: {
    type: Array,
    default: [],
  },
  employmentHistory: {
    type: Array,
    default: [],
  },
  educationHistory: {
    type: Array,
    default: [],
  },
  websiteAndSocialLinks: {
    type: Array,
    default: [],
  },
  skills: {
    type: Array,
    default: [],
  },
  hobbies: {
    type: Array,
    default: [],
  },
  courses: {
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
  references: {
    type: Array,
    default: [],
  },
});

const CVtemplate = mongoose.model("CVTemplate", cvTemplateSchema);
module.exports = CVtemplate;
