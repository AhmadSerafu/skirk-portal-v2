const genshindb = require("genshin-db");
const { Build, BuildCharacter } = require("../models");

const ENKA_BASE = "https://enka.network/ui";
const enkaUrl = (filename) =>
  filename?.trim() ? `${ENKA_BASE}/${filename}.png` : null;

const enrichBuildCharacters = (buildCharacters) =>
  buildCharacters.map((bc) => {
    const char = genshindb.characters(bc.characterId);
    return {
      ...bc.toJSON(),
      icon: enkaUrl(char?.images?.filename_icon) || null,
      vision: char?.elementText || null,
      splash: enkaUrl(char?.images?.filename_gachaSplash) || null,
    };
  });

const enrichBuild = (build) => ({
  ...build.toJSON(),
  BuildCharacters: enrichBuildCharacters(build.BuildCharacters),
});

class BuildController {
  static async getBuilds(req, res, next) {
    try {
      const { id } = req.traveler;

      const builds = await Build.findAll({
        where: { travelerId: id },
        include: [{ model: BuildCharacter }],
      });

      res.status(200).json(builds.map(enrichBuild));
    } catch (error) {
      next(error);
    }
  }

  static async getBuildById(req, res, next) {
    try {
      const { id } = req.params;

      const build = await Build.findByPk(id, {
        include: [{ model: BuildCharacter }],
      });

      res.status(200).json(enrichBuild(build));
    } catch (error) {
      next(error);
    }
  }

  static async createBuild(req, res, next) {
    try {
      const { id } = req.traveler;
      const { name, description, characters } = req.body;

      if (!characters || characters.length === 0)
        throw {
          name: "BadRequest",
          message: "At least 1 character is required",
        };

      if (characters.length > 4)
        throw { name: "BadRequest", message: "Maximum 4 characters per build" };

      const build = await Build.create({ name, description, travelerId: id });

      await BuildCharacter.bulkCreate(
        characters.map((characterId, index) => ({
          buildId: build.id,
          characterId,
          slot: index + 1,
        })),
      );

      const result = await Build.findByPk(build.id, {
        include: [{ model: BuildCharacter }],
      });

      res.status(201).json(enrichBuild(result));
    } catch (error) {
      next(error);
    }
  }

  static async updateBuild(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, characters } = req.body;

      if (!characters || characters.length === 0)
        throw {
          name: "BadRequest",
          message: "At least 1 character is required",
        };

      if (characters.length > 4)
        throw { name: "BadRequest", message: "Maximum 4 characters per build" };

      const build = await Build.findByPk(id);
      await build.update({ name, description });

      await BuildCharacter.destroy({ where: { buildId: id } });
      await BuildCharacter.bulkCreate(
        characters.map((characterId, index) => ({
          buildId: id,
          characterId,
          slot: index + 1,
        })),
      );

      const result = await Build.findByPk(id, {
        include: [{ model: BuildCharacter }],
      });

      res.status(200).json(enrichBuild(result));
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
