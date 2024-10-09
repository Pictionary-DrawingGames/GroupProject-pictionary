"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roomContent = [
      {
        content: "content-1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "content-2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "content-3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "content-4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "content-5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "content-6",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "content-7",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Rooms", roomContent, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Rooms", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  },
};
