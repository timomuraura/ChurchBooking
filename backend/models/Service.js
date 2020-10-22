"use strict";
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
    "Service", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    service_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    service_date: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    service_status: {
      allowNull: false,
      type: DataTypes.TINYINT,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    created_by: {
      type: DataTypes.INTEGER,
    },
    modified_by: {
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: "service",
    operatorsAliases: false,
  }
  );
  Service.associate = function (models) {
    // associations can be defined here
    Service.hasMany(models.Booking, {
      foreignKey: "service_id",
      onDelete: "CASCADE",
      as: "service_booking",
    });
  };
  return Service;
};