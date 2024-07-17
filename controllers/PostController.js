const Post = require("../models/Post");
const User = require("../models/User");
const { Op } = require("sequelize");
module.exports = class PostController {
  static async showPost(req, res) {
    let search = "";

    if (req.query.search) {
      search = req.query.search;
    }

    let order = "DESC";

    if (req.query.order == "old") {
      order = "ASC";
    } else {
      order = "DESC";
    }

    const postsData = await Post.findAll({
      include: User,
      where: {
        title: { [Op.like]: `%${search}%` },
      },
      order: [["createdAt", order]],
    });
    const posts = postsData.map((result) => result.get({ plain: true }));

    let postsQty = posts.length;

    if (postsQty === 0) {
      postsQty = false;
    }
    res.render("posts/home", { posts, search, postsQty });
  }

  static async dashboard(req, res) {
    const userId = req.session.userId;
    const user = await User.findOne({
      where: { id: userId },
      include: Post,
      plain: true,
    });

    if (!user) {
      res.redirect("/login");
    }
    const posts = user.Posts.map((result) => result.dataValues);
    let emptyPosts = false;
    if (posts.length === 0) {
      emptyPosts = true;
    }
    res.render("posts/dashboard", { posts, emptyPosts });
  }

  static create(req, res) {
    res.render("posts/create");
  }

  static async createPost(req, res) {
    const { title, description } = req.body;
    const UserId = req.session.userId;
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

  static async edit(req, res) {
    const idPost = req.params.id;

    const post = await Post.findOne({ where: { id: idPost }, raw: true });

    res.render("posts/edit", { post });
  }

  static async editPost(req, res) {
    const id = req.body.id;
    const postData = {
      title: req.body.title,
      description: req.body.description,
    };
    try {
      req.flash("message", "Editado com sucessso!");
      await Post.update(postData, { where: { id: id } });
      res.redirect("dashboard");
    } catch (error) {
      req.flash("message", "Error", error.message);
    }
  }

  static async deletePost(req, res) {
    const id = req.body.id;
    const userId = req.session.userId;
    try {
      await Post.destroy({ where: { id: id, UserId: userId } });
      req.flash("message", "Removido com sucessso!");
      req.session.save(() => {
        res.redirect("dashboard");
      });
    } catch (error) {
      req.flash("message", "Error", error.message);
    }
  }
};
