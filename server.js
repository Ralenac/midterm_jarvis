// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const favicon       = require('serve-favicon');
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(favicon('./public/images/favicon.ico'));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
  );

  app.use(express.static("public"));

  app.get("/", (req, res) => {

    console.log("hello root, rendering login")
    res.render('login');
  });

  // Separated Routes for each Resource
  // Note: Feel free to replace the example routes below with your own
const lookup = require('./lookup/wolfram')
const usersRoutes = require("./routes/users");
const itemsRoutes = require("./routes/items");
const categoriesRoutes = require("./routes/categories");
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register")
const logoutRoutes = require('./routes/logout');

//var db = require('db/db');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
//app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/items", itemsRoutes(db, lookup));
app.use("/api/categories", categoriesRoutes(db));
app.use("/login", loginRoutes(db))
app.use("/register", registerRoutes(db))
app.use("/logout", logoutRoutes());


// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
