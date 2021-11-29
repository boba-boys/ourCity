const Sequelize = require("sequelize");
const db = require("../database");

const Group = db.define("group", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Group;
