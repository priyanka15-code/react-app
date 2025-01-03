const Appointment = require("../models/Appointment");
const MedicalRecord = require("../models/MedicalRecord");
const { successResponse, errorResponse } = require("../utils/responseUtils");

// Book an Appointment
exports.bookAppointment = async (req, res) => {
    const { doctorId, appointmentDate } = req.body;
    const patientId = req.user.userId;
    try {
        // Create a new appointment
        const appointment = new Appointment({
            doctorId,
            patientId,
            date: appointmentDate,
        });
        await appointment.save();

        return successResponse(res, "Appointment booked successfully", appointment);
    } catch (err) {
        console.error(err.message);
        return errorResponse(res, "Failed to book appointment", 500);
    }
};

// View Appointments
exports.viewAppointments = async (req, res) => {
    const patientId = req.user.userId;

    try {
        const appointments = await Appointment.find({ patientId }).populate("doctorId", "name specialization");
        if (!appointments || appointments.length === 0) {
            return errorResponse(res, "No appointments found", 404);
        }

        return successResponse(res, "Appointments retrieved successfully", appointments);
    } catch (err) {
        console.error(err.message);
        return errorResponse(res, "Failed to retrieve appointments", 500);
    }
};

// Cancel Appointment
exports.cancelAppointment = async (req, res) => {
    const { appointmentId } = req.params;
    const patientId = req.user.userId;

    try {
        const appointment = await Appointment.findOneAndDelete({ _id: appointmentId, patientId });
        if (!appointment) {
            return errorResponse(res, "Appointment not found or not authorized to cancel", 404);
        }

        return successResponse(res, "Appointment canceled successfully", appointment);
    } catch (err) {
        console.error(err.message);
        return errorResponse(res, "Failed to cancel appointment", 500);
    }
};

// View Medical History
exports.viewMedicalHistory = async (req, res) => {
    const patientId = req.user.userId;

    try {
        const medicalRecords = await MedicalRecord.find({ patientId }).populate("doctorId", "name specialization");
        if (!medicalRecords || medicalRecords.length === 0) {
            return errorResponse(res, "No medical history found", 404);
        }

        return successResponse(res, "Medical history retrieved successfully", medicalRecords);
    } catch (err) {
        console.error(err.message);
        return errorResponse(res, "Failed to retrieve medical history", 500);
    }
};


// Get All Appointments (Receptionist)
exports.getAllAppointments = async (req, res) => {
    const { doctorId, date, patientId } = req.query;

    try {

        const query = {};
        if (doctorId) {
            query.doctorId = doctorId;
            query.patientId = patientId;


        }
        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1);
            query.date = { $gte: startDate, $lt: endDate };
        }

        const appointments = await Appointment.find(query)
            .populate("doctorId", "name specialization")
            .populate("patientId", "name email");

        if (!appointments || appointments.length === 0) {
            return errorResponse(res, "No appointments found", 404);
        }

        return successResponse(res, "Appointments retrieved successfully", appointments);
    } catch (err) {
        console.error(err.message);
        return errorResponse(res, "Failed to retrieve appointments", 500);
    }
};