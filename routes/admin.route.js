const router = require("express").Router();
const adminController = require("../controllers/admin.controller.js");
const { addStudent } = require("../controllers/student.controller.js");
const verifyToken = require("../middlewares/verifyToken.js");
router.post("/login", adminController.login);
router.post("/add-student", verifyToken, addStudent);
module.exports = router;
