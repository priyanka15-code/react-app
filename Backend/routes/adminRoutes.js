const express = require("express");
const router = express.Router();
const { manageDoctors, manageHospital } = require("../controllers/adminController");
const { isAdmin } = require("../middleware/authMiddleware"); 


router.post("/manage-doctors", isAdmin, manageDoctors);
router.post("/manage-hospital", isAdmin, manageHospital);

module.exports = router;
