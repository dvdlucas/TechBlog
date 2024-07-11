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
  images: {
    type: DataTypes.JSON,
    get() {
      const images = this.getDataValue("images");
      return images ? JSON.parse(images) : [];
    },
    set(images) {
      this.setDataValue("images", JSON.stringify(images));
    },
  },
});

module.exports = User;
