const express = require("express");
const {
  allResumeTemplate,
  getResumeTemplate,
  resumeTemplateDelete,
  createReusmeTemplate,
  allResume,
} = require("../controllers/resumeTemplateController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();
router.route("/resume").get(allResumeTemplate);
router.route("/resumes").get(allResume);
router.route("/resumeinfo").post(isAuthenticatedUser, createReusmeTemplate);
router.route("/getresume").get(isAuthenticatedUser, getResumeTemplate);
router
  .route("/delete-resume/:id")
  .delete(isAuthenticatedUser, resumeTemplateDelete);
module.exports = router;
