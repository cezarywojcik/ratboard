/**
 * File: login.js
 * Desc: the / and /login route
 */

exports.login = function(req, res) {
  res.render("login", {
    "title": "Login"
  });
};
