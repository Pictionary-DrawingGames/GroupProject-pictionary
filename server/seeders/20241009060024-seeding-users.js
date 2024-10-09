"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        username: "jungun",
        score: 13,
        avatar: "avatar-1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Naufal",
        avatar: "avatar-2",
        score: 55,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Yubi",
        score: 21,
        avatar: "avatar-3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  },
};
