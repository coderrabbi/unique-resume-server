const CoverLetter = require("../models/coverLetterModel");
const CoverLetterTemplate = require("../models/coverLetterTemplateModel");

const createCoverLetter = async (req, res) => {
  // const coverLetterInfo = await CoverLetter.create(req.body);
  // res.status(201).json({
  //   success: true,
  //   coverLetterInfo,
  // });

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

const coverLetterUpdate = async (req, res) => {
  try {
    await CoverLetter.findOneAndUpdate({ email: req.body.email }, req.body);
    const updateCoverletter = await CoverLetter.findOne({
      email: req.body.email,
    });
    res.status(200).json(updateCoverletter);
  } catch (error) {
    res.status(400).json(error);
  }
};
const coverLetters = async (req, res) => {
  const query = {};
  const cursor = await CoverLetter.find(query);
  if (cursor) {
    res.status(200).send(cursor);
  } else {
    res.status(404).send("faild to find data");
  }
};
const coverLetterDelete = async (req, res) => {
  const coverLetter = await CoverLetter.findById(req.params.id);
  if (!coverLetter) {
    return res.status(404).json("cover letter not found");
  }
  await coverLetter.remove();

  res.status(200).json({
    success: true,
    message: "Cover letter Delete Successfully",
  });
};

module.exports = {
  createCoverLetter,
  coverLetterUpdate,
  coverLetterDelete,
  coverLetters,
};
