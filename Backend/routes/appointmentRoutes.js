const express = require("express");
const router = express.Router();
const {
    bookAppointment,
    viewAppointments,
    cancelAppointment,
    viewMedicalHistory,
    getAllAppointments
} = require("../controllers/appointmentController");
const { checkRoles } = require("../middleware/authMiddleware");


router.post("/", checkRoles(["patient", "receptionist"]), bookAppointment);
router.get("/", checkRoles(["patient"]), viewAppointments);
router.delete("/:appointmentId", checkRoles(["patient", "receptionist"]), cancelAppointment);
router.get("/medical-history", checkRoles(["patient", "receptionist"]), viewMedicalHistory);
router.get("/receptionist", checkRoles(["receptionist"]), getAllAppointments)

module.exports = router;
