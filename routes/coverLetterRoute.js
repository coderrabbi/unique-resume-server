const express = require("express");
const { coverLetterDelete } = require("../controllers/coverLetterController");
const {
  getCoverLetterTemplate,
  coverLetterTemplate,
} = require("../controllers/coverLetterTemplateControler");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router
  .route("/getcoverletter")
  .get(isAuthenticatedUser, getCoverLetterTemplate);
router.route("/coverletterinfo").post(isAuthenticatedUser, coverLetterTemplate);
router.route("/coverletter/:id").delete(isAuthenticatedUser, coverLetterDelete);
module.exports = router;
