const jwt = require("jsonwebtoken");

const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY);
};

const verifyToken = (tokenValue) => {
  return jwt.verify(tokenValue, process.env.JWT_SECRET_KEY);
};

module.exports = { signToken, verifyToken };
