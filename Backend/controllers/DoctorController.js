const Appointment = require("../models/Appointment");
const MedicalRecord = require("../models/MedicalRecord");
const { errorResponse } = require("../utils/errorUtils");

// Get Doctor's Appointment Schedule
exports.getAppointments = async (req, res) => {
    const { userId } = req.params;
    /* console.log("Fetching appointments for doctor/userId:", userId); */
    try {
        const appointments = await Appointment.find({ doctorId: userId }).sort({ date: 1, time: 1 });
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



//  Medical Records
exports.manageMedicalRecords = async (req, res) => {
    const { action, recordId } = req.body;

    try {
        if (action === "add") {
            const { doctorId, patientId, diagnosis, treatment } = req.body;
            if (!doctorId || !patientId || !diagnosis || !treatment) {
                return errorResponse(res, "All fields are required", 400);
            }
            const newMedicalRecord = new MedicalRecord({
                doctorId,
                patientId,
                diagnosis,
                treatment,
            });
            await newMedicalRecord.save();
            return res.json({
                success: true,
                message: "Medical record added successfully",
                medicalRecord: newMedicalRecord,
            });
        }

        if (action === "update" && recordId) {
            const { doctorId, patientId, diagnosis, treatment } = req.body;
            const medicalRecord = await MedicalRecord.findById(recordId);
            if (!medicalRecord) {
                return errorResponse(res, "Medical record not found", 404);
            }
            medicalRecord.doctorId = doctorId || medicalRecord.doctorId;
            medicalRecord.patientId = patientId || medicalRecord.patientId;
            medicalRecord.diagnosis = diagnosis || medicalRecord.diagnosis;
            medicalRecord.treatment = treatment || medicalRecord.treatment;
            await medicalRecord.save();
            return res.json({
                success: true,
                message: "Medical record updated successfully",
                medicalRecord,
            });
        }

        if (action === "remove" && recordId) {
            const medicalRecord = await MedicalRecord.findByIdAndDelete(recordId);
            if (!medicalRecord) {
                return errorResponse(res, "Medical record not found", 404);
            }
            return res.json({
                success: true,
                message: "Medical record removed successfully",
            });
        }
        return errorResponse(res, "Invalid action or record ID", 400);
    } catch (err) {
        console.error(err.message);
        return errorResponse(res, "Server Error", 500);
    }
};
