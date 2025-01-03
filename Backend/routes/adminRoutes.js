const express = require("express");
const router = express.Router();
const { manageDoctors, manageHospital } = require("../controllers/adminController");
const { checkRoles } = require("../middleware/authMiddleware");


router.post("/manage-doctors", checkRoles(["admin"]), manageDoctors);
router.post("/manage-hospital", checkRoles(["admin"]), manageHospital);

module.exports = router;
