"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      itemName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          min: 5,
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      totalCogs: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      totalPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      invoiceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
