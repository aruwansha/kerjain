const router = require("express").Router();
const apiController = require("../controllers/apiController");
const { uploadProofPayment } = require("../middlewares/multer");
const bodyParser = require("body-parser");
const { verify } = require("../middlewares/auth");


/* Service User */
router.post("/user/register", apiController.register);
router.post("/user/login", apiController.login);
router.get("/user/landing-page", apiController.landingPage);
router.get("/user/category-page", apiController.categoryPage);
router.get("/user/:id", apiController.detailPage);
router.get("/user/me", verify, apiController.me);
router.post("/user/booking-page", verify, uploadProofPayment, apiController.bookingPage);

module.exports = router;
