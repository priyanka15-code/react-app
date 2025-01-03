const express = require("express");
const router = express.Router();
const { getAppointments, manageMedicalRecords } = require("../controllers/DoctorController");
const { checkRoles } = require("../middleware/authMiddleware");


router.get("/appointments/:userId", checkRoles(["doctor"]), getAppointments);
router.post("/medicals", checkRoles(["doctor"]), manageMedicalRecords);

module.exports = router;
