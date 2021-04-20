const router = require("express").Router();
const apiController = require("../controllers/apiController");
// const authController = require('../controllers/authController');
// const { upload } = require("../middlewares/multer");
// const auth = require("../middlewares/auth");

/* Service User */
router.post("/user/register", apiController.register_user);
router.get("/user/landing-page", apiController.landingPage);
router.get("/user/category-page", apiController.categoryPage);
router.get("/user/:id", apiController.detailPage);

module.exports = router;
