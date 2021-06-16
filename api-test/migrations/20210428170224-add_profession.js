'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('professions',
      [
        { profession: 'Actor' },
        { profession: 'Butcher' },
        { profession: 'Doctor' },
        { profession: 'Librarian' },
        { profession: 'Painter' }
      ]
    )
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('professions', [
        { profession: 'Actor' },
        { profession: 'Butcher' },
        { profession: 'Doctor' },
        { profession: 'Librarian' },
        { profession: 'Painter' }
      ])
  }
};
