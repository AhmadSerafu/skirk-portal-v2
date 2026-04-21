const { Traveler } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class AuthController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const newTraveler = await Traveler.create({ email, password });

      const travelerData = newTraveler.toJSON();
      delete travelerData.password;

      res.status(201).json(travelerData);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "BadRequest", message: "Email is required" };
      if (!password)
        throw { name: "BadRequest", message: "Password is required" };

      const traveler = await Traveler.findOne({
        where: {
          email,
        },
      });
      if (!traveler)
        throw { name: "Unauthorized", message: "Invalid Email/Password" };

      const isValidPassword = comparePassword(password, traveler.password);
      if (!isValidPassword)
        throw { name: "Unauthorized", message: "Invalid Email/Password" };

      const payload = {
        id: traveler.id,
        email: traveler.email,
      };
      const token = signToken(payload);

      res.status(200).json({ access_token: token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
