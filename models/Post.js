const db = require("../db/coon");
const { DataTypes } = require("sequelize");
const User = require("./User");

const Post = db.define("Post", {
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

Post.belongsTo(User);
User.hasMany(Post);

module.exports = Post;
