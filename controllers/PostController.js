const Post = require("../models/Post");
const User = require("../models/User");

module.exports = class PostController {
  static async showPost(req, res) {
    res.render("posts/home");
  }

  static async dashboard(req, res) {
    res.render("posts/dashboard");
  }

  static create(req, res) {
    res.render("posts/create");
  }
};
