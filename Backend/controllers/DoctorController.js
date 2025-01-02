const Appointment = require("../models/Appointment");
const MedicalRecord = require("../models/MedicalRecord");
const { errorResponse } = require("../utils/errorUtils");

// Get Doctor's Appointment Schedule
exports.getAppointments = async (req, res) => {
    const { doctorId } = req.params;

    try {
        const appointments = await Appointment.find({ doctorId }).sort({ date: 1, time: 1 });
        if (!appointments.length) {
            return errorResponse(res, "No appointments found", 404);
        }

        res.json({
            success: true,
            appointments,
        });
    } catch (error) {
        console.error(error.message);
        errorResponse(res, "Server Error", 500);
    }
};

// Update Medical Records
exports.updateMedicalRecords = async (req, res) => {
    const { doctorId, patientName, diagnosis, treatment } = req.body;

    try {
        const medicalRecord = new MedicalRecord({
            doctorId,
            patientName,
            diagnosis,
            treatment,
        });

        await medicalRecord.save();
        res.json({
            success: true,
            message: "Medical record updated successfully",
            medicalRecord,
        });
    } catch (error) {
        console.error(error.message);
        errorResponse(res, "Server Error", 500);
    }
};
