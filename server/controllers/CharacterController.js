const axios = require("axios");
const GENSHIN_API_BASE_URL = "https://genshin.jmp.blue";

class CharacterController {
  static async getCharacters(req, res, next) {
    try {
      const { data } = await axios.get(
        `${GENSHIN_API_BASE_URL}/characters/all?lang=en`,
      );

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getCharacterById(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios.get(
        `${GENSHIN_API_BASE_URL}/characters/${id}?lang=en`,
      );

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CharacterController;
