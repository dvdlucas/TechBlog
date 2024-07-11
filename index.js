const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");
const User = require("./models/User");
const Publication = require("./models/Publication");
const PublicationRoutes = require("./routes/PublicationRoutes");
const AuthRoutes = require("./routes/AuthRoute");
const conn = require("./db/coon");
const PublicationController = require("./controllers/PublicationController");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require("path").join(require("os").tmpdir(), "sessions"),
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
  if (req.session.userid) {
    res.locals.session = req.session;
  }
  next();
});

app.use("/publications/", PublicationRoutes);
app.use("/", AuthRoutes);
app.get("/", PublicationController.showPublications);

conn
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  })
  .catch((err) => console.log(err));
