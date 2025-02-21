const router = require("express").Router();
const adminController = require("../controllers/admin.controller.js");
const { verifyToken } = require("../middlewares/verifyToken.js");
const { restrictTo } = require("../middlewares/checkRole.js");
const multer = require("multer");
const upload = multer();
router.use(upload.none());

router.post("/login", adminController.login);
router.use(verifyToken);
router.use(restrictTo("super_admin", "admin"));
router.post("/add-admin", adminController.addAdmin);
router.get("/all-admin", adminController.getAll);
router.patch("/update/:id", adminController.update);
router.delete("/:id", adminController.delete);

module.exports = router;
