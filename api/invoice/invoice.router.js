const { getAllInvoices } = require("../invoice/invoice.controller");
const router = require("express").Router();

router.get("/", getAllInvoices);

module.exports = router;
