const router = require("express").Router();
const apiController = require("../controllers/apiController");
const { uploadProofPayment } = require("../middlewares/multer");

const { verify } = require("../middlewares/auth");

router.get("/landing-page", apiController.landingPage);
router.get("/category-page", apiController.categoryPage);
router.get("/freelancer/:id", apiController.detailPage);
router.post("/register", apiController.register);
router.post("/login", apiController.login);
router.get("/landing-page/me", verify, apiController.me);
router.get("/order/get", verify, apiController.getOrder);
router.post(
  "/service/order",
  verify,
  uploadProofPayment,
  apiController.orderPage
);
router.get("/request/get", verify, apiController.getRequest);
router.post("/request/add", verify, apiController.addRequest);
router.get("/request/:id", verify, apiController.getDetailRequest);
router.put("/request/:id", verify, apiController.chooseFreelancer);
router.get("/review/get", verify, apiController.getReview);
router.post("/review/add", verify, apiController.addReview);
router.get("/chat/get", verify, apiController.chats);
router.get("/chat/get/:freelancerId", verify, apiController.detailChat);
router.post("/chat/add/:freelancerId", verify, apiController.addChat);

module.exports = router;
