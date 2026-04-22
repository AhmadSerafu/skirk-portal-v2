const { Traveler } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

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

  static async googleLogin(req, res, next) {
    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

      const { access_token_google } = req.headers;

      if (!access_token_google)
        throw { name: "BadRequest", message: "Invalid Token" };

      const ticket = await client.verifyIdToken({
        idToken: access_token_google,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      if (!payload.email_verified) {
        throw { name: "BadRequest", message: "Email is not verified" };
      }

      const [traveler] = await Traveler.findOrCreate({
        where: { email: payload.email },
        defaults: {
          password: Date.now().toString() + Math.random().toString(),
        },
      });

      const access_token = signToken({
        id: traveler.id,
        email: traveler.email,
      });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
