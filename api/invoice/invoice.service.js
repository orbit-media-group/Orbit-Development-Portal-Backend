const connection = require("../config/mysql");

const invoiceServices = {
  getAllInvoicesHandler: async (callback) => {
    const promisePool = connection.promise();
    const res = await promisePool.query(`SELECT * FROM invoices`);

    if (res && res[0] && res[0].length > 0) {
      for (let i = 0; i < res[0].length; i++) {
        const customer = await promisePool.query(
          `SELECT id,fname,lname,email,phone,address FROM customers WHERE id=${res[0][i].customer_id}`
        );
        res[0][i].customerDetails =
          customer && customer[0] && customer[0].length > 0 ? customer[0] : {};
      }
      return callback(null, res[0]);
    }
    return callback({ err: "no record found" });
  },
};

module.exports = invoiceServices;
