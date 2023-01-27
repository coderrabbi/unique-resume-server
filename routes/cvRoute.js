const express = require("express");
const {
  createCoverLetter,
  coverLetterUpdate,
  coverLetterDelete,
} = require("../controllers/coverLetterController");
const allCV = require("../controllers/cvControler");
const {
  cvTemplate,
  allCvTemplate,
  getCvTemplate,
} = require("../controllers/cvTemplateController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();
router.route("/cv").get(allCV);
router.route("/cvinformation").post(isAuthenticatedUser, cvTemplate);
router.route("/cvinformation").get(allCvTemplate);
router.route("/getcv").get(isAuthenticatedUser, getCvTemplate);
router.route("/coverletterinfo").post(isAuthenticatedUser, createCoverLetter);
// router.route("/coverletterinfo").post(isAuthenticatedUser, createCoverLetter);
router.route("/coverletterinfo").put(isAuthenticatedUser, coverLetterUpdate);
router.route("/coverletter/:id").delete(isAuthenticatedUser, coverLetterDelete);
module.exports = router;
