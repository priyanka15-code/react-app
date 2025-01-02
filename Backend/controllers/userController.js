const User = require("../models/User");
const { errorResponse } = require("../utils/errorUtils");


// Update User Profile
exports.updateProfile = async (req, res) => {
    const { userId } = req.params;
    const { name, email, phone, address, profilePicture } = req.body;

    try {
        // Find the user by ID
        let user = await User.findById(userId);
        if (!user) {
            return errorResponse(res, "User not found", 404);
        }
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.address = address || user.address;
        user.profilePicture = profilePicture || user.profilePicture;
        user.updatedAt = Date.now();
        await user.save();
        res.json({
            success: true,
            message: "Profile updated successfully",
            user,
        });
    } catch (err) {
        console.error(err.message);
        errorResponse(res, "Server Error", 500);
    }
};


// Get User Profile
exports.getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return errorResponse(res, "User not found", 404);
        }
        res.json({
            success: true,
            user,
        });
    } catch (err) {
        console.error(err.message);
        errorResponse(res, "Server Error", 500);
    }
};


// Delete User Profile
exports.deleteProfile = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return errorResponse(res, "User not found", 404);
        }
        res.json({
            success: true,
            message: "User profile deleted successfully",
        });
    } catch (err) {
        console.error(err.message);
        errorResponse(res, "Server Error", 500);
    }
};
exports.searchProfile = async (req, res) => {
    const { query } = req.query;
    console.log(req.query);

    if (!query || typeof query !== "string" || query.trim().length === 0) {
        return errorResponse(res, "Invalid search query", 400);
    }

    try {
        console.log("Search started");
            const users = await User.find({
            $or: [
                { username: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } },
                { role: { $regex: query, $options: "i" } },
            ],
        })/* .explain('executionStats'); */

        if (users.length === 0) {
            return errorResponse(res, "No users found matching the query", 404);
        }

        res.json({
            success: true,
            users,
        });
    } catch (err) {
        console.error(err.message);
        errorResponse(res, "Server Error", 500);
    }
};

