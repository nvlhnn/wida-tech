"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Invoices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      customerName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          min: 2,
        },
      },
      salespersonName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          min: 2,
        },
      },
      paymentType: {
        type: Sequelize.ENUM("CASH", "CREDIT"),
        allowNull: false,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
        validate: {
          min: 5,
        },
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
    await queryInterface.dropTable("Invoices");
  },
};
