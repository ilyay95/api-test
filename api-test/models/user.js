'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsTo(models.professions);
    }
  }
  Users.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'users',
  });

  return Users;
};
