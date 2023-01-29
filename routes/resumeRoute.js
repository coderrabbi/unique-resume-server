const express = require("express");
const {
  allResumeTemplate,
  reusmeTemplate,
  getResumeTemplate,
  resumeTemplateDelete,
} = require("../controllers/resumeTemplateController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();
router.route("/resume").get(allResumeTemplate);
router.route("/resumeinfo").post(isAuthenticatedUser, reusmeTemplate);
router.route("/getresume").get(isAuthenticatedUser, getResumeTemplate);
router.route("/resume/:id").delete(isAuthenticatedUser, resumeTemplateDelete);
module.exports = router;
