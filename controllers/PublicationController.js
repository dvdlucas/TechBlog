const Publication = require("../models/Publication");

module.exports = class PublicationController {
  static async getAll(req, res) {
    res.render("toughts/home");
  }

  static async create(req, res) {}
};
