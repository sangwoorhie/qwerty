'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      orderId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      storeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          models: 'Stores',
          key: 'storeId',
        },
        onDelete: 'CASCADE',
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          models: 'Users',
          key: 'userId',
        },
        onDelete: 'CASCADE',
      },
      payAmount: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      delivery: {
        allowNull: true, // NULL
        type: Sequelize.BOOLEAN,
        default: false,
      },
      status: {
        allowNull: true, // NULL
        type: Sequelize.INTEGER,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  },
};
