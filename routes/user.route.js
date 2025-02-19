const router = require("express").Router();
const {
  addStudent,
  getAllStudents,
  getOneStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/student.controller.js");
const { verifyToken } = require("../middlewares/verifyToken.js");
const { restrictTo } = require("../middlewares/checkRole.js");
const multer = require("multer");
const upload = multer();
upload.none();

router.use(verifyToken);
router.get(
  "/all-Students",
  restrictTo("super_admin", "user", "exams"),
  getAllStudents
);
router.use(restrictTo("super_admin", "user"));
router.post("/add-student", addStudent);
router.put("/update-student/:studentId", updateStudent);

router.delete("/delete-student/:studentId", deleteStudent);

router.get("/:id", getOneStudent);
module.exports = router;
