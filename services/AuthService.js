const { request } = require("express");
const User = require("../models/User");

module.exports = class AuthService {
  static async create(userData) {
    const { name, email, password, confirmpassword, images } = userData;
    //validations
    if (!name) {
      request.flash("message", "O nome é obrigatório");
    }

    if (!email) {
      throw new Error("O email é obrigatório");
    }

    if (!password) {
      throw new Error("a senha é obrigatório");
    }

    if (password != confirmpassword) {
      throw new Error("as senhas não são iguais");
    }

    // Add images to userData
    userData.images = images;

    // Create user
    const newUser = await User.create(userData);

    return newUser;
  }
};
