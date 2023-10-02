'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Reviews', {
            reviewId: {
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
            rating: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            content: {
                allowNull: false,
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('Reviews');
    },
};
