"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Build extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Build.belongsTo(models.Traveler, { foreignKey: "travelerId" });
      Build.hasMany(models.BuildCharacter, { foreignKey: "buildId" });
    }
  }
  Build.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Build name is required" },
          notEmpty: { msg: "Build name cannot be empty" },
        },
      },
      description: {
        type: DataTypes.STRING,
      },
      travelerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Build",
    },
  );
  return Build;
};
