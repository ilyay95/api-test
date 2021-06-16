'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users',
      [
        { firstName: 'Jhon', age:'20',professionId:'2' },
        { firstName: 'Jacob', age:'12',professionId:'1' },
        { firstName: 'William', age:'23',professionId:'2' },
        { firstName: 'Michael', age:'70',professionId:'4' },
        { firstName: 'Alexander', age:'28',professionId:'3' }
      ]
    )
  },  
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', [
        { firstName: 'Jhon', age:'20',professionId:'2' },
        { firstName: 'Jacob', age:'12',professionId:'1' },
        { firstName: 'William', age:'23',professionId:'2' },
        { firstName: 'Michael', age:'70',professionId:'4' },
        { firstName: 'Alexander', age:'28',professionId:'3' }
      ]
    )
  }
};
