'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profession extends Model {
    static associate(models) {
      Profession.hasMany(models.user)
    }
  };
  Profession.init({
    profession: {
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
      modelName: 'Profession',
    },
  );
  return Profession;
};