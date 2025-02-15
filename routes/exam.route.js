const router = require("express").Router();
const {
  verifyToken,
  verifyTokenExam,
} = require("../middlewares/verifyToken.js");
const checkExamRole = require("../middlewares/checkRole.js");
const {
  addExam,
  deleteExam,
  resetValidStudents,
  getExam,
  getAllExam,
  updateExam,
  deleteImage,
  addImage,
  loginToExam,
  submit_exam,
  getStudentScores,
  getExamDetails,
} = require("../controllers/exam.controller.js");
const upload = require("../config/multer.js");

router.post("/add-exam", verifyToken, checkExamRole, addExam);
router.get("/get-all-exam", verifyToken, checkExamRole, getAllExam);
router.get("/get-exam/:examId", verifyToken, checkExamRole, getExam);
router.put("/update-exam/:examId", verifyToken, checkExamRole, updateExam);
router.delete("/delete-exam/:examId", verifyToken, checkExamRole, deleteExam);
router.post(
  "/add-image/:examId",
  verifyToken,
  checkExamRole,
  upload.single("image"),
  addImage
);
router.delete("/delete-image/:examId", verifyToken, checkExamRole, deleteImage);
router.patch(
  "/reset-valid-students/:examId",
  verifyToken,
  checkExamRole,
  resetValidStudents
);
router.post("/login-to-exam", loginToExam);
router.post("/submit-exam", verifyTokenExam, submit_exam);
router.get("/student-scores", getStudentScores);
router.get("/exam-details/:studentCode/:examCode", getExamDetails);

module.exports = router;
