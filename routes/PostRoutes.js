const express = require("express");
const PostController = require("../controllers/PostController");
const router = express.Router();
const checkAuth = require("../helpers/auth").checkAuth;

router.get("/add", checkAuth, PostController.create);
router.post("/add", checkAuth, PostController.createPost);
router.get("/edit/:id", checkAuth, PostController.edit);
router.get("/dashboard", checkAuth, PostController.dashboard);
router.get("/", PostController.showPost);
router.post("/edit", checkAuth, PostController.editPost);
router.post("/remove", checkAuth, PostController.deletePost);

module.exports = router;
