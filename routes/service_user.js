const router = require("express").Router();
const serviceUserController = require("../controllers/serviceUserController");
const { uploadProofPayment } = require("../middlewares/multer");

const { verify } = require("../middlewares/auth");

router.get("/landing-page", serviceUserController.landingPage);
router.get("/category-page", serviceUserController.categoryPage);
router.get("/freelancer/:id", serviceUserController.detailPage);
router.post("/register", serviceUserController.register);
router.get("/landing-page/me", verify, serviceUserController.me);
router.get("/profile/get", verify, serviceUserController.getProfile);
router.put("/profile/update", verify, serviceUserController.editProfile);
router.get("/order/get", verify, serviceUserController.getOrder);
router.get("/order/get/:id", verify, serviceUserController.getOrderDetail);
router.post(
  "/order/service",
  verify,
  uploadProofPayment,
  serviceUserController.orderService
);
router.post(
  "/order/request",
  verify,
  uploadProofPayment,
  serviceUserController.orderRequest
);
router.put("/order/confirm", verify, serviceUserController.confirmOrder);
router.get("/request/get", verify, serviceUserController.getRequest);
router.post("/request/add", verify, serviceUserController.addRequest);
router.get("/request/:id", verify, serviceUserController.getDetailRequest);
router.put("/request/:id", verify, serviceUserController.chooseFreelancer);
router.get("/review/get", verify, serviceUserController.getReview);
router.post("/review/add/:id", verify, serviceUserController.addReview);
router.get("/chat/get", verify, serviceUserController.chats);
router.get("/chat/get/:id", verify, serviceUserController.detailChat);
router.post("/chat/add/:id", verify, serviceUserController.addChat);
router.delete("/chat/delete/:id", verify, serviceUserController.deleteAllChat);
router.delete("/chat/get/delete/:id", verify, serviceUserController.deleteChat);

module.exports = router;
