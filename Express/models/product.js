"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      itemName: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      totalCogs: DataTypes.DECIMAL,
      totalPrice: DataTypes.DECIMAL,
      invoiceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  
  return Product;
};