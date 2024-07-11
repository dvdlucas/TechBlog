const express = require("express");
const exps = require("express-handlebars");
const session = require("express-session");
const fileStore = require("session-file-store");
const flash = require("express-flash");
const User = require("./models/User");
const Publication = require("./models/Publication");
const app = express();
const conn = require("./db/coon");

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
