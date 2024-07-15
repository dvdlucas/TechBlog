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

  static async createPost(req, res) {
    const { title, description } = req.body;
    const UserId = req.session.userId;
    const images = "publicimages\techblog.jpg";
    if (!title) {
      req.flash("message", "Necessário um titulo para registar o post!");
      res.render("posts/add");
      return;
    }

    if (!description) {
      req.flash(
        "message",
        "Necessário a descrisção para registar para o post!"
      );
      res.render("posts/add");
      return;
    }

    const post = {
      title,
      description,
      UserId,
      images,
    };
    try {
      await Post.create(post);
      req.flash("message", "Cadastro realizado com sucessso!");
      req.session.save(() => {
        res.redirect("/posts/dashboard");
      });
    } catch (error) {
      console.log(error.message);
      req.flash("message", error.message);
      res.redirect("/posts/add");

      return;
    }
  }
};
