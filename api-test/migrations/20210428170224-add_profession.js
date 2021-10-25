'use strict';

module.exports = {
  up: async (queryInterface) => {
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
  down: async (queryInterface) => {
    return queryInterface.bulkDelete('professions',
      [
        { name: 'Actor' },
        { name: 'Butcher' },
        { name: 'Doctor' },
        { name: 'Librarian' },
        { name: 'Painter' }
      ])
  }
};
