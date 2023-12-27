import mysql from "mysql2";
import { DATABASE_URL } from "../../config.js";

const connection = mysql.createPool(DATABASE_URL);

export default connection;
