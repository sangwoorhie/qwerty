// models/ordermenus

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderMenus extends Model {
    static associate(models) {
      // OrderMenu모델 - order모델 : N:1 관계
      this.belongsTo(models.Orders, {
        targetKey: 'orderId',
        foreignKey: 'orderId',
      });

      // OrderMenu모델 - menu모델 : N:1 관계
      this.belongsTo(models.Menus, {
        targetKey: 'menuId',
        foreignKey: 'menuId',
      });

      // OrderMenu모델 - Users모델 : N:1 관계
      this.belongsTo(models.Users, {
        targetKey: 'userId',
        foreignKey: 'userId',
        });
    }
  }

  OrderMenus.init(
    {
      orderMenuId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
      },
      menuId: {
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
      },
      orderId: {
        allowNull: true, // NULL
        type: DataTypes.INTEGER,
      },
      quantity: {
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      totalPrice: {
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
      },
      status: {
        allowNull: true, // NULL
        type: DataTypes.INTEGER,
        defaultValue: false,
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
      modelName: 'OrderMenus',
    },
  );
  return OrderMenus;
};