"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class refreshToken extends Model {}
  refreshToken.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true,
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
      sequelize,
      modelName: "refreshToken",
      tableName: 'refresh_tokens',
      timestamps: true,
    }
  );
  return refreshToken;
};