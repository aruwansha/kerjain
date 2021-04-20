const router = require("express").Router();
const authController = require("../controllers/authController");
const auth = require("../middlewares/auth");

/* GET home page. */

router.get("/signin", authController.viewSignin);
router.post("/signin", authController.actionSignin);
router.use(auth);
router.get("/logout", authController.actionLogout);

module.exports = router;
