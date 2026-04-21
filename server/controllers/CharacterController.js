const axios = require("axios");
const GENSHIN_API_BASE_URL = "https://genshin.jmp.blue";

class CharacterController {
  static async getCharacters(req, res, next) {
    try {
      const { vision, weapon, nation, rarity } = req.query;

      const { data } = await axios.get(
        `${GENSHIN_API_BASE_URL}/characters/all?lang=en`,
      );

      let filteredData = data;

      if (vision) {
        filteredData = filteredData.filter(
          (character) =>
            character.vision.toLowerCase() === vision.toLowerCase(),
        );
      }

      if (weapon) {
        filteredData = filteredData.filter(
          (character) =>
            character.weapon.toLowerCase() === weapon.toLowerCase(),
        );
      }

      if (nation) {
        filteredData = filteredData.filter(
          (character) =>
            character.nation.toLowerCase() === nation.toLowerCase(),
        );
      }

      if (rarity) {
        filteredData = filteredData.filter(
          (character) => character.rarity === Number(rarity),
        );
      }

      res.status(200).json(filteredData);
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
