import dotenv from "dotenv";
dotenv.config();

const { SECRET_KEY, DATABASE_URL } = process.env;

export { SECRET_KEY, DATABASE_URL };