const CoverLetterTemplate = require("../models/coverLetterTemplateModel");

const coverLetterTemplate = async (req, res) => {
  try {
    let template = await CoverLetterTemplate.findOneAndUpdate(
      {
        user: req.user.id,
      },
      { $set: req.body },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.status(200).json({ message: "success", template });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getCoverLetterTemplate = async (req, res) => {
  try {
    const template = await CoverLetterTemplate.findOne({
      user: req.user.id,
    }).populate("user", "email name _id");
    if (!template) {
      return res.status(400).json({
        success: false,
        message: "Template Not Found In your Profile",
      });
    }
    res.status(200).json({ success: true, template });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { coverLetterTemplate, getCoverLetterTemplate };
