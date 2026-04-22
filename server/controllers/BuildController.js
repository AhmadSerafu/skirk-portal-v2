const { Build, BuildCharacter } = require("../models");

class BuildController {
  static async getBuilds(req, res, next) {
    try {
      const { id } = req.traveler;

      const build = await Build.findAll({
        where: { travelerId: id },
        include: [
          {
            model: BuildCharacter,
          },
        ],
      });

      res.status(200).json(build);
    } catch (error) {
      next(error);
    }
  }

  static async getBuildById(req, res, next) {
    try {
      const { id } = req.params;

      const build = await Build.findByPk(id, {
        include: [
          {
            model: BuildCharacter,
          },
        ],
      });

      res.status(200).json(build);
    } catch (error) {
      next(error);
    }
  }

  static async createBuild(req, res, next) {
    try {
      const { id } = req.traveler;
      const { name, description, characters } = req.body;

      if (!characters || characters.length === 0) {
        throw {
          name: "BadRequest",
          message: "At least 1 character is required",
        };
      }

      if (characters.length > 4) {
        throw { name: "BadRequest", message: "Maximum 4 characters per build" };
      }

      const build = await Build.create({ name, description, travelerId: id });

      const buildCharacters = characters.map((characterId, index) => ({
        buildId: build.id,
        characterId,
        slot: index + 1,
      }));
      await BuildCharacter.bulkCreate(buildCharacters);

      const result = await Build.findByPk(build.id, {
        include: [{ model: BuildCharacter }],
      });

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateBuild(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, characters } = req.body;

      if (!characters || characters.length === 0) {
        throw {
          name: "BadRequest",
          message: "At least 1 character is required",
        };
      }

      if (characters.length > 4) {
        throw { name: "BadRequest", message: "Maximum 4 characters per build" };
      }

      const build = await Build.findByPk(id);

      await build.update({ name, description });

      await BuildCharacter.destroy({ where: { buildId: id } });
      const buildCharacters = characters.map((characterId, index) => ({
        buildId: id,
        characterId,
        slot: index + 1,
      }));
      await BuildCharacter.bulkCreate(buildCharacters);

      const result = await Build.findByPk(id, {
        include: [{ model: BuildCharacter }],
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteBuild(req, res, next) {
    try {
      const { id } = req.params;
      const build = await Build.findByPk(id);

      await build.destroy();
      res.status(200).json({ message: "Build deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BuildController;
