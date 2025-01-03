const express = require("express");
const router = express.Router();
const Billing = require("../models/Billing");
const { errorResponse } = require("../utils/errorUtils");


// Manage Billing
router.post("/manage-billing", async (req, res) => {
    const { action, billingId, appointmentId, amount, status } = req.body;

    try {
        if (action === "add") {
            if (!appointmentId || !amount) {
                return errorResponse(res, "All fields are required", 400);
            }
            const newBilling = new Billing({
                appointmentId,
                amount,
            });

            await newBilling.save();

            return res.json({
                success: true,
                message: "Billing record added successfully",
                billing: newBilling,
            });
        }

        if (action === "update" && billingId) {
            const billing = await Billing.findById(billingId);
            if (!billing) {
                return errorResponse(res, "Billing record not found", 404);
            }

            billing.amount = amount || billing.amount;
            billing.status = status || billing.status;

            await billing.save();

            return res.json({
                success: true,
                message: "Billing record updated successfully",
                billing,
            });
        }

        if (action === "remove" && billingId) {
            const billing = await Billing.findByIdAndDelete(billingId);
            if (!billing) {
                return errorResponse(res, "Billing record not found", 404);
            }

            return res.json({
                success: true,
                message: "Billing record removed successfully",
            });
        }

        return errorResponse(res, "Invalid action or billing ID", 400);
    } catch (err) {
        console.error(err.message);
        return errorResponse(res, "Server Error", 500);
    }
});

module.exports = router;
