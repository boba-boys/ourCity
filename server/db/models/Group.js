const Sequelize = require("sequelize");
const db = require("../database");

module.exports = db.define("group", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
