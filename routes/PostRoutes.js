const express = require("express");
const PostController = require("../controllers/PostController");
const router = express.Router();
const checkAuth = require("../helpers/auth").checkAuth;

router.get("/add", checkAuth, PostController.create);
router.get("/dashboard", checkAuth, PostController.dashboard);
router.get("/", PostController.showPost);

module.exports = router;
