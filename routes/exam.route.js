const express = require("express");
const verifyToken = require("../middlewares/verifyToken.js");
const checkExamRole = require("../middlewares/checkRole.js");
const { addExam } = require("../controllers/exam.controller.js");
const router = express.Router();

router.post("/add-exam", verifyToken, checkExamRole, addExam);

module.exports = router;
