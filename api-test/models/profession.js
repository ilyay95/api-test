'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Professions extends Model {
    static associate(models) {
      Professions.hasMany(models.users);
    }
  }
  Professions.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
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
  },
    {
      sequelize,
      modelName: 'professions',
    },
  );

  return Professions;
};
