const Doctor = require("../models/Doctor");
const Hospital = require("../models/hospital");
const { errorResponse } = require("../utils/errorUtils");

// Add or Remove Doctor
exports.manageDoctors = async (req, res) => {
    const { action, doctorId } = req.body;

    try {
        if (action === "add") {
            const { name, email, phone, specialization, hospitalId } = req.body;
            const newDoctor = new Doctor({
                name,
                email,
                phone,
                specialization,
                hospitalId,
            });
            await newDoctor.save();
            return res.json({
                success: true,
                message: "Doctor added successfully",
                doctor: newDoctor,
            });
        }

        if (action === "remove" && doctorId) {
            const doctor = await Doctor.findByIdAndDelete(doctorId);
            if (!doctor) {
                return errorResponse(res, "Doctor not found", 404);
            }
            return res.json({
                success: true,
                message: "Doctor removed successfully",
            });
        }

        return errorResponse(res, "Invalid action or doctor ID", 400);
    } catch (err) {
        console.error(err.message);
        return errorResponse(res, "Server Error", 500);
    }
};

// Manage Hospital Information
exports.manageHospital = async (req, res) => {
    const { hospitalId, name, location, contactInfo, action } = req.body; // action: "add" or "update"

    try {
        if (action === "add") {
            const newHospital = new Hospital({
                name,
                location,
                contactInfo,
            });
            await newHospital.save();
            return res.json({
                success: true,
                message: "Hospital added successfully",
                hospital: newHospital,
            });
        }

        if (action === "update" && hospitalId) {
            const hospital = await Hospital.findById(hospitalId);
            if (!hospital) {
                return errorResponse(res, "Hospital not found", 404);
            }
            hospital.name = name || hospital.name;
            hospital.location = location || hospital.location;
            hospital.contactInfo = contactInfo || hospital.contactInfo;
            await hospital.save();
            return res.json({
                success: true,
                message: "Hospital information updated successfully",
                hospital,
            });
        }

        return errorResponse(res, "Invalid action or hospital ID", 400);
    } catch (err) {
        console.error(err.message);
        return errorResponse(res, "Server Error", 500);
    }
};
