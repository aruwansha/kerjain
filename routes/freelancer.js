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
  verify,
  uploadService,
  freelancerController.postService
);
router.put(
  "/service/edit",
  verify,
  uploadService,
  freelancerController.putService
);
router.delete("/service/delete", verify, freelancerController.deleteService);

// request
router.get("/requests", verify, freelancerController.getRequests);
router.get("/requests/:id", verify, freelancerController.getRequest);
router.post("/request/bid", verify, freelancerController.postBid);
router.put("/request/bid", verify, freelancerController.putBid);

// chat
router.get("/chats", verify, freelancerController.getChats);
router.delete("/chats/:id", verify, freelancerController.deleteChats);
router.get("/chats/:id", verify, freelancerController.getChat);
router.delete(
  "/chats/detail/:id",
  verify,
  freelancerController.deleteChat
);
router.post("/chat/:id", verify, freelancerController.postChat);

// setting
router.get("/profile", verify, freelancerController.getProfile);
router.put(
  "/profile/personal",
  verify,
  uploadUser,
  freelancerController.putPersonalData
);
router.put(
  "/profile/service",
  verify,
  uploadServiceUser,
  freelancerController.putServiceData
);
router.put("/profile/bank", verify, freelancerController.putBankData);

// order
router.get("/orders", verify, freelancerController.getOrders);
router.get("/orders/:id", verify, freelancerController.getOrder);
router.put(
  "/order/:id/upload",
  verify,
  uploadWork,
  freelancerController.sendProofWork
);

module.exports = router;
