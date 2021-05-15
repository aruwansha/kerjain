const router = require("express").Router();
const apiController = require("../controllers/apiController");
const { uploadProofPayment } = require("../middlewares/multer");

const { verify } = require("../middlewares/auth");

/* Service User */
router.get("/user/landing-page", apiController.landingPage);
router.get("/user/category-page", apiController.categoryPage);
router.get("/user/:id", apiController.detailPage);
router.post("/user/register", apiController.register);
router.post("/user/login", apiController.login);
router.get("/user/landing-page/me", verify, apiController.me);
router.post("/user/service/order", verify, uploadProofPayment, apiController.orderPage);

module.exports = router;
