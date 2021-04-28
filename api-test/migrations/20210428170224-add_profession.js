'use strict';

var Professions = require('../models/profession');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return Professions.bulkCreate(
      [
        { profession: "Actor" },
        { profession: "Butcher" },
        { profession: "Doctor" },
        { profession: "Librarian" },
        { profession: "Painter" }
      ]
    )
  },

  down: async (queryInterface, Sequelize) => {

    return Professions.destroy({
      where: {
        profession: [
          "Actor",
          "Butcher",
          "Doctor",
          "Librarian",
          "Painter"
        ]
      }
    })
  }
};
