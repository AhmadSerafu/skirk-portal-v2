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
    const builds = [
      {
        name: "Abyss Vanguard",
        description: "High damage team for Spiral Abyss floor 12",
        travelerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Freeze Team",
        description: "Cryo + Hydro reaction team",
        travelerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Builds", builds, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Builds", null, {});
  },
};
