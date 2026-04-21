"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Traveler extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Traveler.hasMany(models.Build, { foreignKey: "travelerId" });
    }
  }
  Traveler.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Email is required" },
          notEmpty: { msg: "Email cannot be empty" },
          isEmail: { msg: "Please provide a valid email address" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password is required" },
          notEmpty: { msg: "Password cannot be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "Traveler",
    },
  );

  Traveler.beforeCreate((traveler, options) => {
    traveler.password = hashPassword(traveler.password);
  });

  return Traveler;
};
