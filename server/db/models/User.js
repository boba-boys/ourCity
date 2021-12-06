const Sequelize = require("sequelize");
const db = require("../database");
 const jwt = require("jsonwebtoken");// We need a mobile token!!
 const bcrypt = require("bcrypt");

 const SALT_ROUNDS = 5;

const User = db.define("user", {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "Not defined",
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    defaultValue: "Not defined",
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;

/**
 * instanceMethods
 */

 User.prototype.correctPassword = function (candidatePwd) {

  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {

  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
 User.authenticate = async function ({ email, password }) {

  const user = await this.findOne({ where: { email } });

  if (!user || !(await user.correctPassword(password))) {


  }else{
  return user.generateToken();
  }
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    if (!user) {
      throw "no user of that token exists";
    }
    return user;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
