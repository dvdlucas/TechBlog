const db = require("../db/coon");
const { DataTypes } = require("sequelize");
const User = require("./User");

const Publication = db.define("Publication", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  images: {
    type: DataTypes.JSON,
    allowNull: false,
    get() {
      const images = this.getDataValue("images");
      return images ? JSON.parse(images) : [];
    },
    set(images) {
      this.setDataValue("images", JSON.stringify(images));
    },
  },
});

Publication.belongsTo(User);
User.hasMany(Publication);

module.exports = Publication;
