const router = require("express").Router();
const freelancerController = require("../controllers/freelancerController");
const { uploadService } = require("../middlewares/multer");
const { isLogin } = require("../middlewares/auth");

// auth
router.use(isLogin);

// dashboard
router.get("/", freelancerController.viewDashboard);
router.get("/dashboard", freelancerController.viewDashboard);

// profile
router.get("/profile", freelancerController.viewProfile);
router.put("/profile/:id/personal", freelancerController.actionEditPersonal);
router.put("/profile/:id/service", freelancerController.actionEditService);
router.put("/profile/:id/bank", freelancerController.actionEditBank);

// service
router.get("/service", freelancerController.viewService);
router.post(
  "/service/add",
  uploadService,
  freelancerController.actionAddService
);
router.put("/service/edit", freelancerController.actionEditServiceDetail);
router.delete(
  "/service/delete",
  freelancerController.actionDeleteServiceDetail
);

// request
router.get("/request", freelancerController.viewRequest);

// chat
router.get("/chat", freelancerController.viewChat);
router.delete("/chat/:id/delete", freelancerController.actionDeleteChat);
router.get("/chat/:id", freelancerController.viewDetailChat);
router.delete(
  "/chat/detail/:id/delete",
  freelancerController.actionDeleteDetailChat
);
router.post("/chat/detail/:id/reply", freelancerController.actionReplyChat);

// setting
router.get("/setting/edit-profile", freelancerController.viewEditProfil);

// order
router.get("/order", freelancerController.viewOrder);
router.get("/order/:id", freelancerController.viewDetailOrder);

module.exports = router;
