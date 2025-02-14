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
  deleteImage,
  addImage,
  loginToExam,
  submit_exam,
} = require("../controllers/exam.controller.js");
const upload = require("../config/multer.js");

router.post("/add-exam", verifyToken, checkExamRole, addExam);
router.get("/get-all-exam", verifyToken, checkExamRole, getAllExam);
router.get("/:id", verifyToken, checkExamRole, getExam);
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
router.post("/submit-exam", submit_exam);

module.exports = router;
