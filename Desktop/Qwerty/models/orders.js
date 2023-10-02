// models/orders

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
      // order모델 - user모델 : N:1 관계
      this.belongsTo(models.Users, {
        targetKey: 'userId',
        foreignKey: 'userId',
      });

      // // order모델 - store모델 : N:1 관계
      this.belongsTo(models.Stores, {
        targetKey: 'storeId',
        foreignKey: 'storeId',
      });

      // order모델 -  orderMenu모델 : 1:N 관계
      this.hasMany(models.OrderMenus, {
        sourceKey: 'orderId',
        foreignKey: 'orderId',
      });
    }
  }
  Orders.init(
    {
      orderId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key
        type: DataTypes.INTEGER,
      },
      storeId: {
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
      },
      payAmount: {
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
      },
      address: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      delivery: {
        allowNull: true, // NULL
        type: DataTypes.BOOLEAN,
        default: false,
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
      modelName: 'Orders',
    },
  );
  return Orders;
};

