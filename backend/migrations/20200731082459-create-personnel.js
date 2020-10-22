'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("personnel", {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          personnel_name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          personnel_status: {
            type: Sequelize.TINYINT,
          },
          personnel_password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          personnel_reset_password: {
            type: Sequelize.TINYINT,
            allowNull: false,
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updated_at: {
            type: Sequelize.DATE,
          },
        });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("personnel");
  }
};