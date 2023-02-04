const mongoose = require("mongoose");

const cvTemplateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    default: "",
  },
  email: { type: String, default: "" },
  imageUrl: { type: String, default: "" },
  mobileNumber: { type: String, default: "" },
  fathersName: { type: String, default: "" },
  mothersName: { type: String, default: "" },
  dateOfBirth: { type: String, default: "" },
  sex: { type: String, default: "" },
  blood: { type: String, default: "" },
  nationality: { type: String, default: "" },
  religion: { type: String, default: "" },
  maritalStatus: { type: String, default: "" },
  nid: { type: String, default: "" },
  portfolio: { type: String, default: "" },
  address: { type: String, default: "" },
  carrierObjective: { type: String, default: "" },
  education: { type: Array, default: [] },
  skills: { type: Array, default: [] },
  experience: { type: Array, default: [] },
  projects: { type: Array, default: [] },
  presentAdd: { type: Array, default: [] },
  permanentAdd: { type: Array, default: [] },
  personalSkills: { type: Array, default: [] },
  languageSkills: { type: Array, default: [] },
});

const CVtemplate = mongoose.model("CVTemplate", cvTemplateSchema);
module.exports = CVtemplate;
