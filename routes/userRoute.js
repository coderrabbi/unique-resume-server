const express = require("express");
const {
  createSubscription,
  addNewCustomer,
  createCheckout,
  createCheckoutSession,
} = require("../controllers/paymentController");

const {
  registerUser,
  loginUser,
  allUser,
  logOut,
  getUserDetails,
  changePassword,
  forgotPassword,
  resetPassword,
  updateProfile,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");
const { userSignupValidator } = require("../middleware/validator");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOut);
router.route("/changepassword").put(isAuthenticatedUser, changePassword);
router.route("/password/forgot").post(forgotPassword);
router.route("/resetpassword/:token").put(resetPassword);
router.route("/update-profile").put(isAuthenticatedUser, updateProfile);
router.route("/user-details").get(isAuthenticatedUser, getUserDetails);
router.route("/allusers").get(allUser);
// router.route("/subscription").post(isAuthenticatedUser, addNewCustomer);
router.route("/checkout").post(isAuthenticatedUser, createCheckoutSession);
// router.route("/").get("server is runnig");
module.exports = router;
