const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");
const path = require("path");
const User = require("./models/User");
const Post = require("./models/Post");
const PostRoutes = require("./routes/PostRoutes");
const AuthRoutes = require("./routes/AuthRoutes");
const conn = require("./db/coon");
const PostController = require("./controllers/PostController");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionPath = path.join(__dirname, "session");

app.use(
  session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: sessionPath,
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);

app.use(flash());
app.use(express.static("public"));

app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.session = req.session;
  }
  next();
});

app.use("/posts", PostRoutes);
app.use("/", AuthRoutes);
app.get("/", PostController.showPost);

conn
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  })
  .catch((err) => console.log(err));
