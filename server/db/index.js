const db = require("./database");
// const { User, Group, Tag, Comment } = require("./models"); // Why this doesnt work?
const User = require("./models/User");
const Group = require("./models/Group");
const Tag = require("./models/Tag");
const Comment= require("./models/Comment");

User.belongsToMany(Group, { through: Comment });
Group.belongsToMany(User, { through: Comment });

Comment.belongsTo(Tag);

module.exports = {
  db,
  models: {
    Group,
    Tag,
    User,
    Comment,
  }
};
