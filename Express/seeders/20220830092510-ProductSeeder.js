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

    const products = new Array();
    for (let i = 1; i <= 15; i++) {
      let cogs = (Math.floor(Math.random() * 20) + 1) * 7000;
      let price = cogs + (Math.floor(Math.random() * 20) + 1) * 1500;
      products.push({
        itemName: `product${i}`,
        quantity: Math.floor(Math.random() * 10) + 1,
        totalCogs: cogs,
        totalPrice: price,
        invoiceId: Math.floor(Math.random() * 3) + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("Products", products, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.dropTable("Products");
  },
};
