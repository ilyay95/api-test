module.exports = {
    up: async function (queryInterface, Sequelize) {
        await queryInterface.createTable('connections', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                type: Sequelize.INTEGER,
            },
            groupId: {
                allowNull: false,
                references: {
                    model: 'groups',
                    key: 'id'
                },
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                defaultValue: Sequelize.fn('now'),
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            }
        });
    },
    down: async function (queryInterface, Sequelize) {
        await queryInterface.dropTable('connections');
    }
};
