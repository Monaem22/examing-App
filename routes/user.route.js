const router = require("express").Router();
const {
  addStudent,
  getAllStudents,
  getOneStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/student.controller.js");
const { Auth } = require("../middlewares/authorized.js");
const verifyToken = require("../middlewares/verifyToken.js");
router.post("/add-student", verifyToken, Auth, addStudent);
router.put("/update-student/:studentId", verifyToken, Auth, updateStudent);
router.delete("/delete-student/:studentId", verifyToken, Auth, deleteStudent);
router.get("/all-Students", verifyToken, Auth, getAllStudents);
router.get("/:id", verifyToken, Auth, getOneStudent);
module.exports = router;
