/**
 * File: app.js
 * Desc: This is the main node app file for ratboard
 */

// ---- [ includes ] ----------------------------------------------------------

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var jade = require("jade");
var server = require('http').Server(app);
var io = require('socket.io')(server);
var logger = require("./logger.js");
var routes = require("./routes");
var settings = require("./settings.js");
var sockethandler = require("./sockethandler.js").handler;

// ---- [ setup ] -------------------------------------------------------------

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

server.listen(settings.port, function() {
  logger.log("ratboard started on port " + server.address().port);
});

io.on("connection", sockethandler);
