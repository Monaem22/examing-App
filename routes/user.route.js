const router = require("express").Router();
const {
  addStudent,
  getAllStudents,
  getOneStudent,
  updateStudent,
  patchUpdateStudent,
  deleteStudent,
} = require("../controllers/student.controller.js");
const { Auth } = require("../middlewares/authorized.js");
const verifyToken = require("../middlewares/verifyToken.js");
const checkUserRole = require("../middlewares/checkRole.js");
router.post("/add-student", verifyToken, Auth, checkUserRole, addStudent);
router.put(
  "/update-student/:studentId",
  verifyToken,
  Auth,
  checkUserRole,
  updateStudent
);

router.delete(
  "/delete-student/:studentId",
  verifyToken,
  Auth,
  checkUserRole,
  deleteStudent
);
router.get("/all-Students", verifyToken, Auth, checkUserRole, getAllStudents);
router.get("/:id", verifyToken, Auth, checkUserRole, getOneStudent);
module.exports = router;
