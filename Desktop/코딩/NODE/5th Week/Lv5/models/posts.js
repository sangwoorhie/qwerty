'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Posts모델 - Users모델 : N:1관계
      this.belongsTo(models.Users, {
        targetKey: 'userId',
        foreignKey: 'UserId',
      });

      // Posts모델 - Comments모델 : 1:N관계
      this.hasMany(models.Comments, {
        sourceKey: 'UserId',
        foreignKey: 'UserId',
      });

      // Posts모델 - PostLikes모델 : 1:N관계
      this.hasMany(models.PostLikes, {
        sourceKey: 'postId',
        foreignKey: 'postId',
      });
    }
  }
  Posts.init({
    postId: {
      allowNull: false, // NOT NULL
      autoIncrement: true, // AUTO_INCREMENT
      primaryKey: true, // Primary Key (기본키)
      type: DataTypes.INTEGER,
    },
    UserId: {
      allowNull: false, // NOT NULL
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false, // NOT NULL
      type: DataTypes.STRING,
    },
    content: {
      allowNull: false, // NOT NULL
      type: DataTypes.STRING,
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
    modelName: 'Posts',
  }
);
return Posts;
};