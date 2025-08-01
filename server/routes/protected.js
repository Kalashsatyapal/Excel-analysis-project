const router = require("express").Router();
const { verifyUser, checkRole } = require("../middleware/auth");

router.get("/user", verifyUser, checkRole(["user"]), (req, res) => {
  res.json({ msg: "Welcome to User Dashboard" });
});

router.get("/admin", verifyUser, checkRole(["admin"]), (req, res) => {
  res.json({ msg: "Welcome to Admin Dashboard" });
});

module.exports = router;
