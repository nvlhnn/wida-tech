const { Op, Sequelize } = require("sequelize");
const moment = require("moment"); // require
const { Invoice, Product } = require("../models");
const setResponse = require("../utils/response");
var XLSX = require("xlsx");
const InvoiceSchema = require("../validations/InvoiceShema");
const fs = require("fs");

class InvoiceController {
  static read = async (req, res, next) => {
    try {
      const { date, size, page } = req.query;

      let limit = size ? +size : 10;
      let skip = page ? (page - 1) * limit : 0;

      const filter = {};

      if (date) {
        let startDate = moment(date, "DD/MM/YYYY").toDate();
        // let endDate = moment(startDate).add(1, "d").toDate();
        filter.date = startDate;
      }

      const data = await Invoice.findAll({
        where: filter,
        limit: limit,
        offset: skip,
        include: { model: Product, as: "products" },
      });

      const sumIds = await Invoice.findAll({
        where: filter,
        attributes: ["id"],
      });

      // console.log(sumIds);

      const sum = await Product.findOne({
        where: {
          invoiceId: {
            [Op.in]: sumIds.map((a) => a.id),
          },
        },
        attributes: [
          [Sequelize.literal(`SUM("totalCogs"*"quantity") `), "totalCogs"],
          [Sequelize.literal(`SUM("totalPrice"*"quantity") `), "totalPrice"],
        ],
      });

      const response = setResponse(
        true,
        {
          totalCash: +sum.dataValues.totalPrice,
          totalProfit: +sum.dataValues.totalPrice - sum.dataValues.totalCogs,
          list: data,
        },
        "invoice list"
      );

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  static create = async (req, res, next) => {
    try {
      req.body.date = moment(req.body.date, "DD/MM/YYYY").toDate();
      const data = await Invoice.create(req.body, {
        include: { model: Product, as: "products" },
      });

      res.status(201).json(setResponse(true, data, "create success"));
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      if (req.body.date) {
        req.body.date = moment(req.body.date, "DD/MM/YYYY").toDate();
      }

      const data = await Invoice.findOne({
        where: { id: req.params.id },
        include: { model: Product, as: "products" },
      });

      if (!data) {
        throw {
          code: 404,
          status: false,
          message: `Invoice with ID ${req.params.id} Not Found`,
        };
      }

      await data.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });

      await data.save();

      res.status(200).json(setResponse(true, data, "update success"));
    } catch (error) {
      next(error);
    }
  };

  static destroy = async (req, res, next) => {
    try {
      const data = await Invoice.findOne({
        where: { id: req.params.id },
      });

      if (!data) {
        throw {
          code: 404,
          status: false,
          message: `Invoie with ID ${req.params.id} Not Found`,
        };
      }

      await Invoice.destroy({ where: { id: req.params.id } });
      res.status(200).json(setResponse(true, null, "delete success"));
    } catch (error) {
      next(error);
    }
  };

  static uploadXlsx = async (req, res, next) => {
    try {
      const { file } = req;

      // check if file exist
      if (!file) {
        throw {
          code: 422,
          message: [{ path: "file", message: "Please upload a xlsx file" }],
        };
      }

      const workbook = XLSX.readFile(file.path, {
        cellText: false,
        cellDates: true,
      });
      fs.unlinkSync(file.path);

      var sheet_name_list = workbook.SheetNames;

      // check if sheet valid
      if (
        !sheet_name_list.includes("invoice") ||
        !sheet_name_list.includes("product sold")
      ) {
        throw {
          code: 422,
          message: [
            {
              path: "file",
              message:
                "Invalid xlsx file. File shoud contain two sheets, 'invoice' and 'product sold' ",
            },
          ],
        };
      }

      let invoice = XLSX.utils
        .sheet_to_json(workbook.Sheets["invoice"])
        .map((el, idx) => {
          return {
            ...el,
            row: idx + 2,
          };
        });
      let productSold = XLSX.utils
        .sheet_to_json(workbook.Sheets["product sold"])
        .map((el, idx) => {
          return {
            ...el,
            row: idx + 2,
          };
        });

      let errors = [];

      // check for duplicate invoice
      let invalidInvoice = invoice
        .map((el, idx) => {
          return {
            ...el,
            index: idx,
          };
        })
        .filter(
          (item, index) =>
            invoice.map((el) => el["invoice no"]).indexOf(item["invoice no"]) !=
            index
        );
      invalidInvoice.forEach((el) => {
        errors.push({
          sheet: "invoice",
          row: el.index + 2,
          message: `Duplicate data on invoice with invoice no ${el["invoice no"]}`,
        });
      });

      // remove invalid invoice
      invoice = invoice.filter(
        (el, idx) => !invalidInvoice.map((a) => a.index).includes(idx)
      );

      // check valid invoice id on product sold
      let invalidProduct = productSold
        .map((el, idx) => {
          return {
            ...el,
            index: idx,
          };
        })
        .filter(
          (el) =>
            !invoice.map((a) => a["invoice no"]).includes(el["Invoice no"])
        );
      invalidProduct.forEach((el) => {
        errors.push({
          sheet: "product sold",
          row: el.index + 2,
          message: `Invalid invoice no. Invoice with no ${el["Invoice no"]} doesn't exist on the invoice sheet`,
        });
      });

      // remove invalid product
      productSold = productSold.filter(
        (el, idx) => !invalidProduct.map((a) => a.index).includes(idx)
      );

      // validate invoice with yup
      invalidInvoice = [];
      for (const [idx, iterator] of invoice.entries()) {
        await InvoiceSchema.xlsxInvoice
          .validate(iterator, {
            abortEarly: false,
          })
          .catch((err) => {
            invalidInvoice.push(idx);
            errors.push({
              sheet: "invoice",
              row: iterator.row,
              message: `Invalid data from invoice no ${iterator["invoice no"]}. ${err.inner[0].errors[0]}`,
            });
          });
      }
      invoice = invoice.filter((el, idx) => !invalidInvoice.includes(idx));

      // validate product with yup
      invalidProduct = [];
      for (const [idx, iterator] of productSold.entries()) {
        await InvoiceSchema.xlsxProduct
          .validate(iterator, {
            abortEarly: false,
          })
          .catch((err) => {
            invalidProduct.push(idx);
            errors.push({
              sheet: "product sold",
              row: iterator.row,
              message: `Invalid data. ${err.inner[0].errors[0]}`,
            });
          });
      }
      productSold = productSold.filter(
        (el, idx) => !invalidProduct.includes(idx)
      );

      // assigning product to their invoice
      const validProduct = [];
      invoice = invoice.map((el) => {
        const products = productSold
          .filter((product) => product["Invoice no"] == el["invoice no"])
          .map((prod) => {
            validProduct.push(prod);
            return {
              itemName: prod.item,
              quantity: prod.quantity,
              totalCogs: prod["total cogs"],
              totalPrice: prod["total price"],
            };
          });

        return {
          date: moment(el.date).add(1, "d").startOf("day").toDate(),
          customerName: el.customer,
          salespersonName: el.salesperson,
          paymentType: el["payment type"],
          notes: el.notes ? el.notes : null,
          products: products,
        };
      });

      productSold.forEach((el) => {
        if (!validProduct.map((prod) => prod.row).includes(el.row)) {
          errors.push({
            sheet: "product sold",
            row: el.row,
            message: `Invalid data on invoice sheet. With invoice no ${el["Invoice no"]}`,
          });
        }
      });

      // insert data
      const data = await Invoice.bulkCreate(invoice, {
        include: { model: Product, as: "products" },
      });

      // format error
      errors = [
        {
          sheet: "invoice",
          errors: [
            ...errors
              .filter((el) => el.sheet == "invoice")
              .map((el) => {
                return {
                  row: el.row,
                  message: el.message,
                };
              }),
          ],
        },
        {
          sheet: "product sold",
          errors: [
            ...errors
              .filter((el) => el.sheet == "product sold")
              .map((el) => {
                return {
                  row: el.row,
                  message: el.message,
                };
              }),
          ],
        },
      ];

      const respose = setResponse(
        true,
        data,
        errors.length > 0 ? errors : null
      );

      res.status(errors.length > 0 ? 207 : 200).json(respose);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = InvoiceController;
