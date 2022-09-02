"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "Invoices",
      [
        {
          date: new Date("09/01/2022"),
          customerName: "buyer1",
          salespersonName: "sales1",
          paymentType: "CASH",
          notes:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit, rem.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: new Date("09/02/2022"),
          customerName: "buyer2",
          salespersonName: "sales1",
          paymentType: "CREDIT",
          notes:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit, rem.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: new Date("09/01/2022"),
          customerName: "buyer3",
          salespersonName: "sales2",
          paymentType: "CASH",
          notes:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit, rem.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.dropTable("Invoices");
  },
};
