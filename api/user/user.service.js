import connection from "../config/mysql.js";
import bcrypt from "bcrypt";

class UserService {
  async getAllUsers() {
    const promisePool = connection.promise();
    const res = await promisePool.query(`SELECT * FROM users`);

    if (res && res[0] && res[0].length > 0) {
      return res[0];
    }
    return null;
  }
  async addUser(data) {
    const { fname, lname, uid, email, password, phone, address } = data;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const promisePool = connection.promise();
      const res = await promisePool.query(
        'INSERT INTO users (fname, lname, uid, email, password, phone, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [fname, lname, uid, email, hashedPassword, phone, address]
      );

      if(res && res.length>0){
        const user = await promisePool.query(
          'SELECT * FROM users WHERE id = ?',
          [res[0].insertId]
        );

        return user[0][0];
      }
    
      return res[0];
    } catch (error) {
      console.error('Error adding user:', error);
      throw error; // or handle the error in some other way
    }
  }
  async getUserByEmailAndPassword(email,password){
    try {
      const promisePool = connection.promise();
      const user = await promisePool.query('SELECT * FROM users WHERE email = ?', [email]);
  
      if (user && user[0] && user[0][0]) {
        const storedPassword = user[0][0].password;
        const passwordMatch = await bcrypt.compare(password, storedPassword);
  
        if (passwordMatch) {
          return user[0][0];
        }
      }
  
      return null; // Invalid email or password
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }
  
}

export default UserService;
