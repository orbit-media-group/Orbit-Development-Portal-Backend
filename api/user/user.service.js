const connection = require("../config/mysql");

class UserService {
  async getAllUsers() {
    const promisePool = connection.promise();
    const res = await promisePool.query(`SELECT * FROM customers`);

    if (res && res[0] && res[0].length > 0) {
      return res[0];
    }
    return null;
  }
}

module.exports = UserService;
