const Publication = require("../models/Publication");
const User = require("../models/User");

module.exports = class PublicationController {
  static async showPublications(req, res) {
    res.render("toughts/home");
  }

  static async create(req, res) {}
};
