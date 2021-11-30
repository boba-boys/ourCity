const db = require("./database");
// const { User, Group, Tag, Comment } = require("./models"); // Why this doesnt work?
const User = require("./models/User");
const Group = require("./models/Group");
const Tag = require("./models/Tag");
const Comment= require("./models/Comment");

Comment.belongsTo(Tag);
Tag.hasMany(Comment);

Comment.belongsTo(User);

User.belongsToMany(Group, { through: "UserList" });
// Group.hasMany(User /* { through: Comment } */);

Tag.belongsToMany(Group,{through: "TagList"});
Group.belongsToMany(Tag,{through: "TagList"});

// Comment.belongsTo(Group) Error cyclic: Users is dependent of itself 
// Group.hasMany(Comment); Error cyclic: Users is dependent of itself
console.log('This is Group magic methods:',Object.keys(Tag.prototype));

module.exports = {
  db,
  models: {
    Group,
    Tag,
    User,
    Comment,
  }
};
