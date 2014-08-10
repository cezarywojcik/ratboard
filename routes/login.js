/**
 * File: login.js
 * Desc: the /login route
 */

exports.login = {};

exports.login.get = function(req, res) {
  res.render("login", {
    "title": "Login"
  });
};

exports.login.post = function(req, res) {
  var validator = require("validator");

  var fail = false;
  var errors = [];

  if (!req.param("username") || req.param("username").length === 0) {
    errors.push("The username field cannot be empty!");
    fail = true;
  }

  if (!req.param("room") || req.param("room").length === 0) {
    errors.push("The room field cannot be empty!");
    fail = true;
  } else if (!validator.isAlphanumeric(req.param("room"))) {
    errors.push("The room must be an alphanumeric word.");
    fail = true;
  }

  if (fail) {
    res.render("login", {
      "title": "Login",
      errors: errors,
      username: req.param("username"),
      room: req.param("room")
    });
  } else {
    var cookies = require("cookies")(req, res);
    var md5 = require("MD5");

    cookies.set("username", req.param("username"));

    res.redirect("/room/" + req.param("room") + "#" +
      md5(req.param("password")));
  }
};
