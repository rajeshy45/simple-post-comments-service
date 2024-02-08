const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise");

const db = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

// creating database if not exists
(async () => {
  const connection = await mysql.createConnection({
    host: host,
    user: user,
    password: password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${db}\`;`);
  await connection.end();
})();

// connecting to database
const sequelize = new Sequelize(db, user, password, {
  host: host,
  dialect: "mysql",
});

// testing db connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
