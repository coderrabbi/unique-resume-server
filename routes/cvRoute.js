const express = require("express");
const allCV = require("../controllers/cvControler");
const router = express.Router();
router.route("/cv").get(allCV);
module.exports = router;
