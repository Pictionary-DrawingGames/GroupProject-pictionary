"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      // define association here
      Message.belongsTo(models.User, { foreignKey: "senderId" });
      Message.belongsTo(models.Room, { foreignKey: "roomId" });
    }
  }
  Message.init(
    {
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "SenderId is required" },
          notNull: { msg: "SenderId is required" },
        },
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "RoomId is required" },
          notNull: { msg: "RoomId is required" },
        },
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Message is required" },
          notNull: { msg: "Message is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
