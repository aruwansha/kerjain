const router = require("express").Router();
const freelancerController = require("../controllers/freelancerController");
const { upload } = require("../middlewares/multer");

router.get("/", freelancerController.viewDashboard);

// dashboard
router.get("/dashboard", freelancerController.viewDashboard);

// profile
router.get("/profile", freelancerController.viewProfile);
router.put("/profile/:id/personal", freelancerController.actionEditPersonal);
router.put("/profile/:id/service", freelancerController.actionEditService);
router.put("/profile/:id/bank", freelancerController.actionEditBank);

// service
router.get("/service", freelancerController.viewService);

// order
router.get("/order", freelancerController.viewOrder);

module.exports = router;
