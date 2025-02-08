const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken.js");
const checkExamRole = require("../middlewares/checkRole.js");
const { addExam, deleteExam } = require("../controllers/exam.controller.js");

router.post("/add-exam", verifyToken, checkExamRole, addExam);
router.delete("/delete-exam/:examId", verifyToken, checkExamRole, deleteExam);

module.exports = router;
