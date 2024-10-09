"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Message, { foreignKey: "senderId" });
      User.belongsToMany(models.Room, {
        through: "UserRooms",
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "This username has already been taken" },
        validate: {
          notEmpty: { msg: "Username is required" },
          notNull: { msg: "Username is required" },
        },
      },
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      avatar: {
        type: DataTypes.STRING,
        defaultValue: "avatar-1",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
