const ResumeTemplate = require("../models/resumeModel");

const allResumeTemplate = async (req, res) => {
  const query = {};
  const cursor = await ResumeTemplate.find(query);
  if (cursor) {
    res.status(200).send(cursor);
  } else {
    res.status(404).send("faild to find data");
  }
};

const reusmeTemplate = async (req, res) => {
  try {
    let template = await ResumeTemplate.findOneAndUpdate(
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

  // const user = req.user._id;
  // const cvInformation = await CVtemplate.create({req.body},{ new: true, upsert: true, setDefaultsOnInsert: true });
  // res.status(201).json({
  //   success: true,
  //   user,
  //   cvInformation,
  // });
};

const updateResume = async (req, res) => {
  console.log(req.body.email);
  try {
    await ResumeTemplate.findOneAndUpdate({ user: req.user }, req.body);
    const userCV = await ResumeTemplate.findOne({ email: req.body.email });
    res.status(200).json(userCV);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getResumeTemplate = async (req, res) => {
  try {
    const template = await ResumeTemplate.findOne({
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

const resumeTemplateDelete = async (req, res) => {
  const resume = await ResumeTemplate.findById(req.params.id);
  if (!resume) {
    return res.status(404).json("resume not found");
  }
  await resume.remove();

  res.status(200).json({
    success: true,
    message: "resume Delete Successfully",
  });
};
module.exports = {
  allResumeTemplate,
  reusmeTemplate,
  updateResume,
  getResumeTemplate,
  resumeTemplateDelete,
};
