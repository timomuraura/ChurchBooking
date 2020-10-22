'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "personnel",
      [{
        personnel_name: "Admin",
        personnel_status: 1,
        personnel_password: "$2a$10$ECdOnZkH6ZRE9jzvUst4x.PNqKwgSHcaoceTxazjMRg1VojEpHh6S",
        personnel_reset_password: 1,
        updated_at: new Date(),
        created_at: new Date(),
      }, ], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("personnel", null, {});
  }
};