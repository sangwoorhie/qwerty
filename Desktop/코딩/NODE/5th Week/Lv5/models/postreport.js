'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // PostReport모델 - Posts모델 N:1
      this.belongsTo(models.Posts, {
        targetKey: 'postId', 
        foreignKey: 'postId',
      });

      // PostReport모델 - Users모델 N:1
      this.belongsTo(models.Users, {
        targetKey: 'userId', 
        foreignKey: 'reportUserId'
      })
    }
  }
  PostReport.init({
    reportId: {
      allowNull: false, // NOT NULL
      autoIncrement: true, // AUTO_INCREMENT
      primaryKey: true, // Primary Key (기본키)
      type: DataTypes.INTEGER,
    },
    PostId: {
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
    modelName: 'PostReport',
  });
  return PostReport;
};
