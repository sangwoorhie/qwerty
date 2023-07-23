'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stores extends Model {
    static associate(models) {
      // Stores와 Menus는 일대다 관계
      this.hasMany(models.Menus, {
        sourceKey: 'storeId',
        foreignKey: 'storeId',
      });
    }
  }
  Stores.init(
    {
      storeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      storeImage: {
        type: DataTypes.STRING,
      },
      storeName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      totalRating: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Stores',
    },
  );
  return Stores;
};
