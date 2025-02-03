const router = require("express").Router();
const {
  addStudent,
  getAllStudents,
  getOneStudent,
  putUpdateStudent,
  patchUpdateStudent,
  deleteStudent,
} = require("../controllers/student.controller.js");
const { Auth } = require("../middlewares/authorized.js");
const verifyToken = require("../middlewares/verifyToken.js");
const checkUserRole = require("../middlewares/checkUserRole");
router.post("/add-student", verifyToken, Auth, checkUserRole, addStudent);
router.put(
  "/putUpdate-student/:studentId",
  verifyToken,
  Auth,
  checkUserRole,
  putUpdateStudent
);
router.patch(
  "/patchUpdate-student/:studentId",
  verifyToken,
  Auth,
  checkUserRole,
  patchUpdateStudent
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
