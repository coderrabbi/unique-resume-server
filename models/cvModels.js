const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "",
  },
  id: { type: Number },
  img: { type: String, default: "" },
});

const CV = mongoose.model("Cv", cvSchema);
module.exports = CV;
