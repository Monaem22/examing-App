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
router.post("/add-student", verifyToken, Auth, addStudent);
router.put(
  "/putUpdate-student/:studentId",
  verifyToken,
  Auth,
  putUpdateStudent
);
router.patch(
  "/patchUpdate-student/:studentId",
  verifyToken,
  Auth,
  patchUpdateStudent
);
router.delete("/delete-student/:studentId", verifyToken, Auth, deleteStudent);
router.get("/all-Students", verifyToken, Auth, getAllStudents);
router.get("/:id", verifyToken, Auth, getOneStudent);
module.exports = router;
