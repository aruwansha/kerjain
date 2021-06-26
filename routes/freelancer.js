const router = require("express").Router();
const freelancerController = require("../controllers/freelancerController");
const {
  uploadService,
  uploadUser,
  uploadServiceUser,
  uploadWork,
} = require("../middlewares/multer");

const { verify } = require("../middlewares/auth");

// dashboard
router.get("/dashboard", verify, freelancerController.getDashboard);

// service
router.get("/services", verify, freelancerController.getServices);
router.post(
  "/service/add",
  uploadService,
  freelancerController.actionAddService
);
router.put(
  "/service/edit",
  uploadService,
  freelancerController.actionEditServiceDetail
);
router.delete(
  "/service/delete",
  freelancerController.actionDeleteServiceDetail
);

// request
router.get("/requests", verify, freelancerController.getRequests);
router.get("/requests/:id", verify, freelancerController.getRequest);
router.post("/request/bid", freelancerController.actionRequestBid);
router.put("/request/bid", freelancerController.actionChangeBid);

// chat
router.get("/chats", verify, freelancerController.getChats);
router.delete("/chat/:id/delete", freelancerController.actionDeleteChat);
router.get("/chats/:id", verify, freelancerController.getChat);
router.delete(
  "/chat/detail/:id/delete",
  freelancerController.actionDeleteDetailChat
);
router.post("/chat/detail/:id/reply", freelancerController.actionReplyChat);

// setting
router.get("/profile", verify, freelancerController.getProfile);
router.put(
  "/profile/:id/personal",
  uploadUser,
  freelancerController.actionEditPersonal
);
router.put(
  "/profile/:id/service",
  uploadServiceUser,
  freelancerController.actionEditService
);
router.put("/profile/:id/bank", freelancerController.actionEditBank);

// order
router.get("/orders", verify, freelancerController.getOrders);
router.get("/orders/:id", verify, freelancerController.getOrder);
router.put(
  "/order/:id/upload",
  uploadWork,
  freelancerController.actionSendWork
);

module.exports = router;
