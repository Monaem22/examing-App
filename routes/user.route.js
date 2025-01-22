const router = require("express").Router();
const {
  addStudent,
  getAllStudents,
  getOneStudent,
} = require("../controllers/student.controller.js");
const { Auth } = require("../middlewares/authorized.js");
const verifyToken = require("../middlewares/verifyToken.js");
router.post("/add-student", verifyToken, Auth, addStudent);
router.get("/all-Students", getAllStudents);
router.get("/:id", getOneStudent);
module.exports = router;
