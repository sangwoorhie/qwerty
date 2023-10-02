//migration/orderMenus

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderMenus', {
      orderMenuId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      orderId: {
        allowNull: true, // NULL
        type: Sequelize.INTEGER,
        reference: {
          models: 'Orders',
          key: 'orderId',
        },
        onDelete: 'CASCADE',
      },
      menuId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          models: 'Menus',
          key: 'menuId',
        },
        onDelete: 'CASCADE',
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      totalPrice: {
        allowNull: false, // NOT NULL
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('OrderMenus');
  },
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orderMenus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orderMenus');
  }
};