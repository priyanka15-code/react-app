const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/errorUtils");

const isAdmin = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; 
    if (!token) {
        return errorResponse(res, "No token, authorization denied", 401);
    }

    try {
        // Verify token and extract payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "admin") {
            return errorResponse(res, "Access denied", 403);
        }

        req.user = decoded;
        next();
    } catch (err) {
        console.error(err.message);
        return errorResponse(res, "Token is not valid", 401);
    }
};

module.exports = { isAdmin };
