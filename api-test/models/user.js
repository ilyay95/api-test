'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
  };
  User.init({
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
    modelName: 'User',
  });

  return User;
};