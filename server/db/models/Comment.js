const Sequelize = require("sequelize");
const db = require("../database");

Comment = db.define("comment", {
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Not Defined",
        validate: {
            notEmpty: true,
        },
    },
    tagId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    like: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0, // might have to be undefined
        validate: {
            notEmpty: true,
        },
    },
});

module.exports = Comment;
