"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      // define association here
      Room.hasMany(models.Message, { foreignKey: "roomId" });
      Room.belongsToMany(models.User, {
        through: "UserRooms",
        foreignKey: "roomId",
      });
    }
  }
  Room.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Room name is required" },
          notNull: { msg: "Room name is required" },
        },
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Content is required" },
          notNull: { msg: "Content is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
