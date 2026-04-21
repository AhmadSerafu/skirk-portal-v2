"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BuildCharacter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BuildCharacter.belongsTo(models.Build, { foreignKey: "buildId" });
    }
  }
  BuildCharacter.init(
    {
      buildId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      characterId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slot: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "BuildCharacter",
    },
  );
  return BuildCharacter;
};
