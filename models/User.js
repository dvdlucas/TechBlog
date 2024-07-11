const db = require("../db/coon");
const { DataTypes } = require("sequelize");

const User = db.define("User", {
  email: {
    type: DataTypes.STRING,
    required: true,
  },
  password: {
    type: DataTypes.STRING,
    required: true,
  },
});

module.exports = User;
