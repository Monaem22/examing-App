const router = require("express").Router();
const adminController = require("../controllers/admin.controller.js");
const { Auth } = require("../middlewares/authorized.js");
const verifyToken = require("../middlewares/verifyToken.js");
const checkAdminRole = require("../middlewares/checkAdminRole");
const multer = require("multer");
const upload = multer();
router.use(upload.none());

router.post("/login", adminController.login);
router.use(verifyToken);
router.use(Auth);
router.use(checkAdminRole);
router.post("/add-admin", adminController.addAdmin);
router.get("/all-admin", adminController.getAll);
router.get("/:id", adminController.getOne);
router.patch("/update/:id", adminController.update);
router.delete("/:id", adminController.delete);
router.delete("/", adminController.delete);

module.exports = router;
