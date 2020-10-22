'use strict';
module.exports = (sequelize, DataTypes) => {
  const Personnel = sequelize.define(
    "Personnel",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      personnel_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      personnel_status: {
        type: DataTypes.TINYINT,
      },
      personnel_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      personnel_reset_password: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "personnel",
      operatorsAliases: false,
    }
  );
  Personnel.associate = function(models) {
    // associations can be defined here
  };
  return Personnel;
};