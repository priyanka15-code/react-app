const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/errorUtils");

/**
 * Middleware to validate roles against allowed roles
 * @param {Array} allowedRoles 
 * @returns
 */
const checkRoles = (allowedRoles) => {
    return (req, res, next) => {
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) {
            return errorResponse(res, "No token, authorization denied", 401);
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!allowedRoles.includes(decoded.role)) {
                return errorResponse(res, "Access denied", 403);
            }
            req.user = decoded;
            next();
        } catch (err) {
            console.error("Token verification error:", err.message);
            return errorResponse(res, "Token is not valid", 401);
        }
    };
};

module.exports = { checkRoles };
