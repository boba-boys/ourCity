const Sequelize = require("sequelize");
const db = require("../database");

const Comment = db.define("comment", {
    // id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //     allowNull: false
    // },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Not Defined",
        validate: {
            notEmpty: true,
        },
    },
    // userId: {
    //     type: Sequelize.INTEGER,
    //     unique: false,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true,
    //     },
    // },
    // groupId: {
    //     type: Sequelize.INTEGER,
    //     unique: false,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true,
    //     },
    // },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            notEmpty: true,
        },
    },
});

module.exports = Comment;
