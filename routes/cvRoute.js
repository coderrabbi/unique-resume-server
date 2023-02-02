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
  cvTemplateDelete,
} = require("../controllers/cvTemplateController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();
router.route("/cv").get(allCV);
router.route("/cvinformation").post(isAuthenticatedUser, cvTemplate);
router.route("/cvinformation").get(allCvTemplate);
router.route("/getcv").get(isAuthenticatedUser, getCvTemplate);
router.route("/deletecv/:id").delete(isAuthenticatedUser, cvTemplateDelete);

module.exports = router;
