const router = require("express").Router();
const adminController = require("../contollers/adminController");

router.get("/dashboard", adminController.viewDashboard);
router.get("/category", adminController.viewCategory);
router.post("/category", adminController.addCategory);
router.put("/category", adminController.editCategory);
router.delete("/category", adminController.deleteCategory);
router.get("/bank", adminController.viewBank);
router.post("/bank", adminController.addBank);
router.put("/bank", adminController.editBank);
router.delete("/bank", adminController.deleteBank);
router.get("/freelancer", adminController.viewFreelancer);
router.get("/serviceUser", adminController.viewServiceUser);
router.get("/order", adminController.viewOrder);

module.exports = router;
