const moment = require("moment");
const yup = require("yup");

// Hidden for simplicity
class InvoiceSchema {
  static create = yup.object({
    date: yup
      .date()
      .transform((val, ori) => {
        return moment(ori, "DD/MM/YYYY").toDate();
      })
      .required(),
    customerName: yup.string().min(2).required(),
    salespersonName: yup.string().min(2).required(),
    paymentType: yup.mixed().oneOf(["CASH", "CREDIT"]).required(),
    notes: yup.string().notRequired(),
    products: yup
      .array(
        yup.object({
          itemName: yup.string().min(5).required(),
          quantity: yup.number().integer().min(1).required(),
          totalCogs: yup.number().min(0).required(),
          totalPrice: yup.number().min(0).required(),
        })
      )
      .min(1)
      .required(),
  });

  static update = yup.object({
    date: yup.date().transform((val, ori) => {
      return moment(ori, "DD/MM/YYYY").toDate();
    }),
    customerName: yup.string().min(2),
    salespersonName: yup.string().min(2),
    paymentType: yup.mixed().oneOf(["CASH", "CREDIT"]),
    notes: yup.string(),
  });

  static xlsxInvoice = yup.object({
    date: yup.date().required(),
    customer: yup.string().min(2).required(),
    salesperson: yup.string().min(2).required(),
    "payment type": yup.mixed().oneOf(["CASH", "CREDIT"]).required(),
    notes: yup.string().notRequired(),
  });

  static xlsxProduct = yup.object({
    item: yup.string().min(5).required(),
    quantity: yup.number().integer().min(1).required(),
    "total cogs": yup.number().min(0).required(),
    "total price": yup.number().min(0).required(),
  });
}

// daysOfWeek: yup.array(
//   yup.object({
//     registrationNumber: yup.string(),
//     make: yup.string().required("make Required"),
//   })
// ),
module.exports = InvoiceSchema;
