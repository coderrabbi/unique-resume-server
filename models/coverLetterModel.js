const mongoose = require("mongoose");

const coverLetterSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "",
  },
  id: { type: Number },
  image: { type: String, default: "" },
});

const CoverLetter = mongoose.model("CoverLetter", coverLetterSchema);
module.exports = CoverLetter;
