const db = require("./database");
// const { User, Group, Tag, Comment } = require("./models"); // Why this doesnt work?
const User = require("./models/User");
const Group = require("./models/Group");
const Tag = require("./models/Tag");
const Comment= require("./models/Comment");

// Comment.belongsTo(Tag);
// Tag.hasMany(Comment);

// Comment.belongsTo(Tag);

// User.belongsToMany(Comment, { through: "userComments" });
// Comment.belongsToMany(User, { through: "userComments" });

User.hasMany(Comment);
Group.hasMany(Comment);
// Group.hasMany(Comment);
// Comment.belongsTo(Group);
Comment.belongsTo(User);
Comment.belongsTo(Group);


Tag.hasMany(Comment);
Comment.belongsTo(Tag);

// Tag.belongsToMany(Group,{through: "TagList"});
// Group.belongsToMany(Tag,{through: "TagList"});

// Comment.belongsTo(Group) Error cyclic: Users is dependent of itself 
// console.log('This is Group magic methods:',Object.keys(Tag.prototype));

module.exports = {
  db,
  models: {
    Group,
    Tag,
    User,
    Comment,
  }
};
