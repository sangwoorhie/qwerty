'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // 1. CommentReport모델 - Users모델 N:1
      this.belongsTo(models.Users, { 
        targetKey: 'userId',
        foreignKey: 'reportUserId',
      });

      // 2. CommentReport모델 - Comments모델 N:1
      this.belongsTo(models.Comments, { // 2. Users 모델에게 N:1 관계 설정을 합니다.
        targetKey: 'commentId', // 3. Users 모델의 userId 컬럼을
        foreignKey: 'commentId', // 4. Posts 모델의 UserId 컬럼과 연결합니다.
      });
    }
  }
  CommentReport.init({
    reportId: {
      allowNull: false, // NOT NULL
      autoIncrement: true, // AUTO_INCREMENT
      primaryKey: true, // Primary Key (기본키)
      type: DataTypes.INTEGER
    },
    postId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    commentId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING
    },
    reportUserId: {
      allowNull: false,
      type: DataTypes.INTEGER
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
    }
  }, {
    sequelize,
    modelName: 'CommentReport',
  });
  return CommentReport;
};