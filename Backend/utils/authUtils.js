const jwt = require("jsonwebtoken");

// Generate JWT Token
exports.generateToken = (userId, role) => {
  const payload = { userId,role };
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secret, options);
};

// Verify JWT Token
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Token is not valid");
  }
};

// Extract Token from Headers
exports.extractTokenFromHeaders = (req) => {
  const token = req.header("x-auth-token");
  if (!token) throw new Error("No token, authorization denied");
  return token;
};
