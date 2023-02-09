const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "",
  },
  id: { type: Number },
  img: { type: String, default: "" },
});

const Resume = mongoose.model("Resume", resumeSchema);
module.exports = Resume;
