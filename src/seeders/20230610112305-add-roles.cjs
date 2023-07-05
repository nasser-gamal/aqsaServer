'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      {
        name: 'superAdmin',
        nameAr: 'سوبر ادمن',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'admin',
        nameAr: 'ادمن',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'agent',
        nameAr: 'وكيل',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
