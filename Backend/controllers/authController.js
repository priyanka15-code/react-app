const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/authUtils");
const { errorResponse } = require("../utils/errorUtils");

// Register User
exports.register = async (req, res) => {
    const { username, password, name, email, role, phone, address, dateOfBirth, profilePicture } = req.body;

    try {
        let user = await User.findOne({ username });
        if (user) {
            return errorResponse(res, "User already exists", 400);
        }
        user = new User({
            username,
            password,
            name,
            email,
            role,
            phone,
            address,
            dateOfBirth,
            profilePicture,
        });


        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.json({
            success: true,
            message: "User registered successfully",
        });

    } catch (err) {
        console.error(err.message);
        errorResponse(res, "Server Error", 500);
    }
};

// Login User
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (!user) {
            return errorResponse(res, "Invalid credentials", 400);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return errorResponse(res, "Invalid credentials", 400);
        }

        const token = generateToken(user.id,user.role);
        res.json({
            success: true,
            message: "User registered successfully",
            token
        });
    } catch (err) {
        console.error(err.message);
        errorResponse(res, "Server Error", 500);
    }
};
