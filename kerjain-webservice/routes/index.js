const router = require("express").Router();
const authController = require("../controllers/authController");

/* GET home page. */
router.get("/", authController.viewSignin);
router.get("/signin", authController.viewSignin);
router.post("/signin", authController.actionSignin);

router.get("/logout", authController.actionLogout);

module.exports = router;
