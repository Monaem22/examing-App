const router = require("express").Router();
const { addStudent } = require("../controllers/student.controller.js");
const verifyToken = require("../middlewares/verifyToken.js");
router.post("/add-student", verifyToken, addStudent);
module.exports = router;
