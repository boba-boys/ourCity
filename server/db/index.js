const db = require("./database");
const Group = require("./models/Group");
const Tag = require("./models/Tag");

Tag.belongsToMany(Group, { through: "groupTag" });

module.exports = {
  db,
  Group,
  Tag,
};
