const router = require("express").Router();
const authController = require("../controllers/authController");

/* GET home page. */
// router.get("/register", authController.viewSignup);
// router.post("/register", authController.actionSignup);
router.get("/", authController.viewSignin);
router.get("/login", authController.viewSignin);
router.post("/login", authController.actionSignin);
router.get("/logout", authController.actionLogout);
router.put("/change-password", authController.actionChangePassword);
router.post("/api/v1/login", authController.login);

module.exports = router;
