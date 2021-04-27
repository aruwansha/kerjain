const router = require("express").Router();
const freelancerController = require("../controllers/freelancerController");
const { upload } = require("../middlewares/multer");
const auth = require("../middlewares/auth");

// auth
router.use(auth);

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

// chat
router.get("/chat", freelancerController.viewChat);

// setting
router.get("/setting/edit-profile", freelancerController.viewEditProfil);


// order
router.get("/order", freelancerController.viewOrder);

module.exports = router;
