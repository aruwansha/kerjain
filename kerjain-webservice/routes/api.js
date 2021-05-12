const router = require("express").Router();
const apiController = require("../controllers/apiController");
const { upload } = require("../middlewares/multer");

const bodyParser = require("body-parser");

/* Service User */
router.post("/user/register", apiController.register);
router.get("/user/landing-page", apiController.landingPage);
router.get("/user/category-page", apiController.categoryPage);
router.post("/user/login", apiController.login);
router.get("/user/me", apiController.me);
router.get("/user/:id", apiController.detailPage);
router.post("/user/booking-page", upload, apiController.bookingPage);

module.exports = router;
