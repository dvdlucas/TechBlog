const express = require("express");
const PostController = require("../controllers/PostController");
const router = express.Router();

router.get("/", PostController.showPost);

module.exports = router;
