const User = require("../models/User");

module.exports = class UserController {
  static async getAll(req, res) {
    res.render("tougths/home");
  }

  static async create(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    await User.create({ email, password });

    res.redirect("dashboard");
  }
};
