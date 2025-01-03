// Success Response Helper
exports.successResponse = (res, message, data) => {
    return res.json({
        success: true,
        message,
        data,
    });
};

// Error Response Helper
exports.errorResponse = (res, message, statusCode = 500) => {
    return res.status(statusCode).json({
        success: false,
        message,
    });
};
