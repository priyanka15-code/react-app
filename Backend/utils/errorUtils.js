// Error Response Formatter
exports.errorResponse = (res, message, statusCode = 400) => {
    res.status(statusCode).json({ msg: message });
  };
  
  // Throw Error
  exports.throwError = (message) => {
    throw new Error(message);
  };
  