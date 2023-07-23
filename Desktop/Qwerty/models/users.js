'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate(models) {
            // user모델 - order모델 : 1:N 관계
            this.hasMany(models.Users, {
                sourceKey: 'userId',
                foreignKey: 'userId',
            });

            // user모델 - OrderMenus모델 : 1:N 관계
            this.hasMany(models.OrderMenus, {
                sourceKey: 'userId',
                foreignKey: 'userId',
            });
        }
    }

  Users.init(
    {
      userId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      point: {
        allowNull: true, // NULL
        type: DataTypes.STRING,
        defaultValue: 1000000,
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
      modelName: 'Users',
    }
  );
  return Users;
};