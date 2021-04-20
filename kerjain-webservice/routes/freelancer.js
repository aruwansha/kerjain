const router = require("express").Router();
const freelancerController = require("../controllers/freelancerController");
const { upload } = require("../middlewares/multer");

router.get("/", freelancerController.viewDashboard);

// dashboard
router.get("/dashboard", freelancerController.viewDashboard);

// order
router.get("/order", freelancerController.viewOrder);

module.exports = router;
