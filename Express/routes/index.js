const router = require("express").Router();

const invoiceRoute = require("./invoice");

router.use("/invoices", invoiceRoute);

// router.use("/api", router);
// router.get('api/user/stat', (req, res) => res.status(200).json('ok'))
router.get("/", (req, res) => res.status(404).json("No API route found"));

module.exports = router;
