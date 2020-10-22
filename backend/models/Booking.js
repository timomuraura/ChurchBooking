'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      service_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      seats: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      first_name: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      last_name: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      age: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "booking",
      operatorsAliases: false,
    }
  );
  Booking.associate = function(models) {
    // associations can be defined here
       Booking.belongsTo(models.Service, {
         foreignKey: "service_id",
         onDelete: "CASCADE",
         as: "service_booking",
       });
  };
  return Booking;
};