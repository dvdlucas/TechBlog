const db = require("../db/coon");
const { DataTypes } = require("sequelize");

const User = db.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
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
