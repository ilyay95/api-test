'use strict';

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('groups',
      [
        { name: 'group1' },
        { name: 'group2' },
        { name: 'group3' },
        { name: 'group4' },
        { name: 'group5' }
      ]
    )
  },
  down: async (queryInterface) => {
    return queryInterface.bulkDelete('groups', 
    [
        { name: 'group1' },
        { name: 'group2' },
        { name: 'group3' },
        { name: 'group4' },
        { name: 'group5' }
      ])
  }
};
