const express = require("express");
const {
  allResumeTemplate,

  getResumeTemplate,
  resumeTemplateDelete,
  createReusmeTemplate,
} = require("../controllers/resumeTemplateController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();
router.route("/resume").get(allResumeTemplate);
router.route("/resumeinfo").post(isAuthenticatedUser, createReusmeTemplate);
router.route("/getresume").get(isAuthenticatedUser, getResumeTemplate);
router.route("/resume/:id").delete(isAuthenticatedUser, resumeTemplateDelete);
module.exports = router;
