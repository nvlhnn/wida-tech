"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Product, {
        foreignKey: "invoiceId",
        as: "products",
        onDelete: "cascade",
        hooks: true,
      });
    }
  }
  Invoice.init(
    {
      date: DataTypes.DATE,
      customerName: DataTypes.STRING,
      salespersonName: DataTypes.STRING,
      paymentType: DataTypes.ENUM("CASH", "CREDIT"),
      notes: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Invoice",
    }
  );
  return Invoice;
};
