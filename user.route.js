const router = require("express").Router();
const { addStudent } = require("../controllers/student.controller.js");
const {
  getAllStudents,
  getOneStudent,
} = require("../controllers/student.controller.js");
const verifyToken = require("../middlewares/verifyToken.js");
router.post("/add-student", verifyToken, addStudent);
router.get("/all-Students", getAllStudents);
router.get("/:id", getOneStudent);
module.exports = router;
