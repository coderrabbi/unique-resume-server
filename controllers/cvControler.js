const CV = require("../models/cvModels");

const allCV = async (req, res) => {
  const query = {};
  const cursor = await CV.find(query);
  if (cursor) {
    res.status(200).send(cursor);
  } else {
    res.status(404).send("faild to find data");
  }
};
module.exports = allCV;
