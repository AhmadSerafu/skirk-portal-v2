"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const buildCharacters = [
      {
        buildId: 1,
        characterId: "Hu Tao",
        slot: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        buildId: 1,
        characterId: "Xingqiu",
        slot: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        buildId: 1,
        characterId: "Zhongli",
        slot: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        buildId: 1,
        characterId: "Albedo",
        slot: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        buildId: 2,
        characterId: "Kamisato Ayaka",
        slot: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        buildId: 2,
        characterId: "Mona",
        slot: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        buildId: 2,
        characterId: "Diona",
        slot: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        buildId: 2,
        characterId: "Kaedehara Kazuha",
        slot: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("BuildCharacters", buildCharacters, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("BuildCharacters", null, {});
  },
};
