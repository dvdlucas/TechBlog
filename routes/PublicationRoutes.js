const express = require("express");
const PublicationController = require("../controllers/PublicationController");
const router = express.Router();

router.get("/", PublicationController.showPublications);

module.exports = router;
