/**
 * File: app.js
 * Desc: This is the main node app file for ratboard
 */

// ---- [ includes ] ----------------------------------------------------------

var express = require("express");
var bodyParser = require("body-parser");
var jade = require("jade");
var logger = require("./logger.js");
var routes = require("./routes");
var settings = require("./settings.js");

// ---- [ setup ] -------------------------------------------------------------

var app = express();
app.engine("jade", jade.__express);
app.set("view engine", "jade");
app.set("view options", {
  layout: false
});
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser());

// ---- [ routing ] -----------------------------------------------------------

app.get("/", routes.home);

// ---- [ run server ] --------------------------------------------------------

var server = app.listen(settings.port, function() {
  logger.log("ratboard started on port " + server.address().port);
});
