const User = require("../models/User");
const bcrypt = require("bcryptjs");
module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }

  static register(req, res) {
    res.render("auth/register");
  }

  static async registerUser(req, res) {
    const { name, email, password, confirmpassword, images } = req.body;

    if (password != confirmpassword) {
      req.flash("message", "As senhas não conferem, tente novamente!");
      res.render("auth/register");

      return;
    }

    const checkIfUsersExist = await User.findOne({ where: { email: email } });

    if (checkIfUsersExist) {
      req.flash(
        "message",
        "Email ja é usado por outro usuário, utilize outro email!"
      );
      res.render("auth/register");

      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };
    try {
      const createUser = await User.create(user);
      req.flash("message", "Cadastro realizado com sucessso!");

      req.session.userId = createUser.id;
      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      req.flash("message", error.message);
      res.render("auth/register");

      return;
    }
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      req.flash("message", "Uusuario não encontrado!");
      res.render("auth/login");
      return;
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      req.flash("message", "Senha incorreta!");
      res.render("auth/login");
      return;
    }

    req.flash("message", "Login bem sucedido");
    req.session.userId = user.id;
    req.session.save(() => {
      res.redirect("/");
    });
  }

  static async logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }
};
