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
});

Post.belongsTo(User);
User.hasMany(Post);

module.exports = Post;
