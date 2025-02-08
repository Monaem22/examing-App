const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken.js");
const checkExamRole = require("../middlewares/checkRole.js");
const {
  addExam,
  deleteExam,
  resetValidStudents,
  getExam,
  getAllExam,
  updateExam,
} = require("../controllers/exam.controller.js");

router.post("/add-exam", verifyToken, checkExamRole, addExam);
router.get("/:id", verifyToken, checkExamRole, getExam);
router.get("/get-all-exam", verifyToken, checkExamRole, getAllExam);
router.put("/update-exam/:examId", verifyToken, checkExamRole, updateExam);
router.delete("/delete-exam/:examId", verifyToken, checkExamRole, deleteExam);
router.patch(
  "/reset-valid-students/:examId",
  verifyToken,
  checkExamRole,
  resetValidStudents
);

module.exports = router;
