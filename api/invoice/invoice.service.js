const invoiceServices = {
  getAllInvoicesHandler: (callback) => {
    return callback(null, { msg: "all invoices here.." });
  },
};

module.exports = invoiceServices;
