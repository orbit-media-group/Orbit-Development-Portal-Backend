const { getAllInvoicesHandler } = require("./invoice.service");

const invoiceFunctions = {
  getAllInvoices: (req, res) => {
    getAllInvoicesHandler((error, result) => {
      if (error) {
        return res.status(201).json({
          success: 0,
          error: error,
        });
      }
      return res.status(200).json({
        success: 1,
        data: result,
      });
    });
  },
};

module.exports = invoiceFunctions;
