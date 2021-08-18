module.exports = {
  up: async function (queryInterface, DataTypes) {
      await queryInterface.createTable('connection', {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: DataTypes.INTEGER
          },
          userId: {
              references: {
                  model: 'users',
                  key: 'id'
              },
              type: DataTypes.INTEGER,
          },
          groupId: {
              references: {
                  model: 'group',
                  key: 'id'
              },
              type: DataTypes.INTEGER,
         },
          createdAt: {
              allowNull: false,
              defaultValue: DataTypes.fn('now'),
              type: DataTypes.DATE
          }
      });
  },
  down: async function (queryInterface, DataTypes) {
      await queryInterface.dropTable('connection');
  }
};
