'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('connections',
      [
        { userId: '1', groupId: '4' },
        { userId: '1', groupId: '1' },
        { userId: '1', groupId: '3' },
        { userId: '2', groupId: '1' },
        { userId: '3', groupId: '1' },
        { userId: '4', groupId: '2' },
        { userId: '5', groupId: '4' }
      ]
    )
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('connections',
      [
        { userId: '1', groupId: '4' },
        { userId: '1', groupId: '1' },
        { userId: '1', groupId: '3' },
        { userId: '2', groupId: '1' },
        { userId: '3', groupId: '1' },
        { userId: '4', groupId: '2' },
        { userId: '5', groupId: '4' }
      ]
    )
  }
};
