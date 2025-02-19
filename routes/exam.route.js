const router = require("express").Router();
const {
  verifyToken,
  verifyTokenExam,
  verifyTokenDegree,
} = require("../middlewares/verifyToken.js");
const { restrictTo } = require("../middlewares/checkRole.js");
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
  getExamDetails,
  takeExam,
  studentScores,
  loginToDegrees,
} = require("../controllers/exam.controller.js");
const upload = require("../config/multer.js");

//                Degrees
router.post("/login-to-degrees", loginToDegrees);
router.get("/student-scores/:studentCode", verifyTokenDegree, studentScores);
router.get("/exam-details/:studentCode/:examCode", getExamDetails);

//                exams
router.post("/login-to-exam", loginToExam);
router.get("/take-exam", verifyTokenExam, takeExam);
router.post("/submit-exam", verifyTokenExam, submit_exam);

router.use(verifyToken);
router.use(restrictTo("super_admin", "exams"));
router.post("/add-exam", addExam);
router.get("/get-all-exam", getAllExam);
router.get("/get-exam/:examId", getExam);
router.put("/update-exam/:examId", updateExam);
router.delete("/delete-exam/:examId", deleteExam);
router.post("/add-image/:examId", upload.single("image"), addImage);
router.delete("/delete-image/:examId", deleteImage);
router.patch("/reset-valid-students/:examId", resetValidStudents);
router.get("/student-scores-admin/:studentCode", studentScores);

module.exports = router;
