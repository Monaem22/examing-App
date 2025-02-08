const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken.js");
const checkExamRole = require("../middlewares/checkRole.js");
const {
  addExam,
  deleteExam,
  resetValidStudents,
} = require("../controllers/exam.controller.js");

router.post("/add-exam", verifyToken, checkExamRole, addExam);
router.delete("/delete-exam/:examId", verifyToken, checkExamRole, deleteExam);
router.patch(
  "/reset-valid-students/:examId",
  verifyToken,
  checkExamRole,
  resetValidStudents
);

module.exports = router;
