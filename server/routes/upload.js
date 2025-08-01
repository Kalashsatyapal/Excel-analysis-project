const router = require("express").Router();
const multer = require("multer");
const { verifyUser, checkRole } = require("../middleware/auth");
const { uploadExcel } = require("../controllers/uploadController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/excel", verifyUser, checkRole(["user"]), upload.single("file"), uploadExcel);

module.exports = router;
