const CVtemplate = require("../models/cvTemplateModel");

const allCvTemplate = async (req, res) => {
  const query = {};
  const cursor = await CVtemplate.find(query);
  if (cursor) {
    res.status(200).send(cursor);
  } else {
    res.status(404).send("faild to find data");
  }
};

const cvTemplate = async (req, res) => {
  try {
    let template = await CVtemplate.findOneAndUpdate(
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

const updateCv = async (req, res) => {
  console.log(req.body.email);
  try {
    await CVtemplate.findOneAndUpdate({ user: req.user }, req.body);
    const userCV = await CVtemplate.findOne({ email: req.body.email });
    res.status(200).json(userCV);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getCvTemplate = async (req, res) => {
  try {
    const template = await CVtemplate.findOne({ user: req.user.id }).populate(
      "user",
      "email name _id"
    );
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

const cvTemplateDelete = async (req, res) => {
  const cv = await CVtemplate.findById(req.params.id);
  if (!cv) {
    return res.status(404).json("CV  not found");
  }
  await cv.remove();

  res.status(200).json({
    success: true,
    message: "CV Delete Successfully",
  });
};
module.exports = {
  allCvTemplate,
  cvTemplate,
  updateCv,
  getCvTemplate,
  cvTemplateDelete,
};
