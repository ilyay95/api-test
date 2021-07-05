'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('professions',
      [
        { name: 'Actor' },
        { name: 'Butcher' },
        { name: 'Doctor' },
        { name: 'Librarian' },
        { name: 'Painter' }
      ]
    )
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('professions', [
        { name: 'Actor' },
        { name: 'Butcher' },
        { name: 'Doctor' },
        { name: 'Librarian' },
        { name: 'Painter' }
      ])
  }
};
