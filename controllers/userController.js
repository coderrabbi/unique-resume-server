const { User } = require("../models/userModels");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const registerUser = async (req, res) => {
  const { email, password, name, userName, imgUrl } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    res.status(401).send({ message: "user already exists" });
  } else {
    user = new User({
      email,
      password,
      name,
      userName,
      imgUrl,
    });
    const token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.JWT_SECRET_KEY
    );
    await user.save((err, user) => {
      if (err) {
        res.status(400).send({ err: err.message });
      }
      return res.json({ token, user, message: "Register Successfull" });
    });
  }
};

const loginUser = async (req, res) => {
  // find the user based on email
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).json({
      error: "User with that email does not exist. Please signup",
    });
  }
  if (!email || !password) {
    return res.status(400).json({ error: "please enter email and password" });
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign(
    { _id: user._id, name: user.name },
    process.env.JWT_SECRET_KEY
  );
  res.cookie("coToken", token);
  return res.json({ token, user, message: "Login Successfull" });
};

const logOut = (req, res, next) => {
  res.cookie("token", "", {
    expiresIn: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    {
      console.log(error);
    }
  }
};

// change password
const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    res.status(400).send("Please enter all feild");
  }
  const user = await User.findById(req.user._id).select("+password");

  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) {
    res
      .status(403)
      .send({ success: false, message: "Your Password Is Not Match" });
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
};
// forgotPassword
const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(400).json({
      success: false,
      message: `user not found`,
    });
  }

  // Get ResetPassword Token
  const resetToken = await user.getResetToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONT_END_URL}/resetpassword/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail(user.email, `Unique Resume Password Recovery`, message);

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(500).json(error);
  }
};
// reset Password

const resetPassword = async (req, res) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    res.status(401).json({
      success: false,
      message: "Token is invalid or expired",
    });
  }

  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Reset Successfully",
  });
};

const updateProfile = async (req, res) => {
  console.log(req.body);
  try {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: req.body },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    const user = await User.findOne({ _id: req.user._id });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne(req.user._id);
    await user.remove();
    res
      .status(200)
      .json({ success: true, message: "user deleted successfully" });
  } catch (err) {
    res.status(404).send(err);
  }
};

const userDelete = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json("user not found");
  }
  await user.remove();

  res.status(200).json({
    success: true,
    message: "user Delete Successfully",
  });
};

const allUser = async (req, res) => {
  const query = {};
  const cursor = await User.find(query);
  if (cursor) {
    res.status(200).send(cursor);
  } else {
    res.status(404).send("faild to find data");
  }
};

module.exports = {
  loginUser,
  registerUser,
  allUser,
  getUserDetails,
  updateProfile,
  logOut,
  changePassword,
  resetPassword,
  forgotPassword,
  deleteUser,
  userDelete,
};
