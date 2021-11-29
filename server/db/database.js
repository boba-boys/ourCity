// The sole purpose of this module is to establish a connection to your
// Postgres database by creating a Sequelize instance (called `db`).
// You shouldn't need to make any modifications here.

const Sequelize = require("sequelize");
// const pkg = require("../package.json");

console.log("Opening database connection");

// create the database instance that can be used in other database files
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432/mycity",
  {
    logging: false, // so we don't see all the SQL queries getting made
  }
);

module.exports = db;
