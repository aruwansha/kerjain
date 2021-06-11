const router = require("express").Router();
const authController = require("../controllers/authController");

/* GET home page. */
router.get("/register", authController.viewSignup);
router.post("/register", authController.actionSignup);
router.get("/", authController.viewSignin);
router.get("/login", authController.viewSignin);
router.post("/login", authController.actionSignin);

router.get("/logout", authController.actionLogout);

module.exports = router;
