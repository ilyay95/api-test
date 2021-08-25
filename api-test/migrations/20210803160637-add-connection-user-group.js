'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('connection', 
      [
        { userId: '1', groupId: '2'},
        { userId: '2', groupId: '1'},
        { userId: '3', groupId: '1'},
        { userId: '4', groupId: '2'},
        { userId: '5', groupId: '4'}     
      ]
    )
  },  
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('connection',
      [
        { userId: '1', groupId: '2'},
        { userId: '2', groupId: '1'},
        { userId: '3', groupId: '1'},
        { userId: '4', groupId: '2'},
        { userId: '5', groupId: '4'}      
      ]
    )
  }
};
