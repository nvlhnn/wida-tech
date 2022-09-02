const InvoiceController = require("../controllers/InvoiceController");
const upload = require("../middlewares/upload");
const InvoiceSchema = require("../validations/InvoiceShema");
const validate = require("../validations/validator");
const router = require("express").Router();

router.get("/", InvoiceController.read);
router.post("/", validate(InvoiceSchema.create), InvoiceController.create);
router.put("/:id", validate(InvoiceSchema.update), InvoiceController.update);
router.delete("/:id", InvoiceController.destroy);

router.post(
  "/upload-xlsx",
  upload.single("file"),
  InvoiceController.uploadXlsx
);

module.exports = router;
