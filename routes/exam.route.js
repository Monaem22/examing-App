const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken.js");
const checkExamRole = require("../middlewares/checkRole.js");
const { addExam } = require("../controllers/exam.controller.js");

router.post("/add-exam", verifyToken, checkExamRole, addExam);

module.exports = router;
