const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { uploadBank } = require("../middlewares/multer");
const auth = require("../middlewares/auth");

// auth
router.use(auth);

// dashboard endpoint
router.get("/", adminController.viewDashboard);
router.get("/dashboard", adminController.viewDashboard);
// category endpoint
router.get("/category", adminController.viewCategory);
router.post("/category", adminController.addCategory);
router.put("/category", adminController.editCategory);
router.delete("/category", adminController.deleteCategory);
// bank endpoint
router.get("/bank", adminController.viewBank);
router.post("/bank", uploadBank, adminController.addBank);
router.put("/bank", adminController.editBank);
router.delete("/bank", adminController.deleteBank);
// freelancer endpoint
router.get("/freelancer", adminController.viewFreelancer);
router.post("/freelancer", adminController.addFreelancer);
router.get("/freelancer/:id", adminController.showDetailFreelancer);
router.delete("/freelancer/:id/delete", adminController.deleteFreelancer);
router.put("/freelancer/:id", adminController.banFreelancer);
// service user endpoint
router.get("/serviceuser", adminController.viewServiceUser);
router.get("/serviceuser/:id", adminController.showDetailServiceUser);
router.delete("/serviceuser/:id/delete", adminController.deleteServiceUser);
router.put("/serviceuser/:id", adminController.banServiceUser);
// order endpoint
router.get("/order", adminController.viewOrder);
router.get("/order/:id", adminController.viewDetailOrder);
router.put("/order/:id/confirm", adminController.actionConfirmOrder);
router.put("/order/:id/reject", adminController.actionRejectOrder);

module.exports = router;
