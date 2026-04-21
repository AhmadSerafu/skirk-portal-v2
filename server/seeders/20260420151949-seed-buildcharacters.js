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
        characterId: "hu-tao",
        slot: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        buildId: 1,
        characterId: "xingqiu",
        slot: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        buildId: 1,
        characterId: "zhongli",
        slot: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        buildId: 1,
        characterId: "albedo",
        slot: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        buildId: 2,
        characterId: "ayaka",
        slot: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        buildId: 2,
        characterId: "mona",
        slot: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        buildId: 2,
        characterId: "diona",
        slot: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        buildId: 2,
        characterId: "kazuha",
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
