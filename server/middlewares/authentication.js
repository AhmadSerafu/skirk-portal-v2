const { verifyToken } = require("../helpers/jwt");
const { Traveler } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw { name: "Unauthorized", message: "Invalid Token" };
    }

    const rawToken = authorization.split(" ");
    const tokenType = rawToken[0];
    const tokenValue = rawToken[1];

    if (tokenType !== "Bearer" || !tokenValue) {
      throw { name: "Unauthorized", message: "Invalid Token" };
    }

    const payload = verifyToken(tokenValue);

    const traveler = await Traveler.findByPk(payload.id);
    if (!traveler) {
      throw { name: "Unauthorized", message: "Invalid Token" };
    }

    req.traveler = {
      id: traveler.id,
      email: traveler.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
