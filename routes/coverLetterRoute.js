const express = require("express");
const {
  getCoverLetterTemplate,
  coverLetterTemplate,
} = require("../controllers/coverLetterTemplateControler");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router
  .route("/getcoverletter")
  .get(isAuthenticatedUser, getCoverLetterTemplate);
// router.route("/coverletterinfo").post(isAuthenticatedUser, coverLetterTemplate);
module.exports = router;
