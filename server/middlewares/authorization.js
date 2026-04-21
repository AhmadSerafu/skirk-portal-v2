const { Build } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const { id } = req.traveler;
    const { id: buildId } = req.params;

    const build = await Build.findByPk(buildId);

    if (!build) {
      throw { name: "NotFound", message: "Build not found" };
    }

    if (build.travelerId !== id) {
      throw {
        name: "Forbidden",
        message: "You are not authorized to access this build",
      };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
