/**
 * File: loginPost.js
 * Desc: the /login(POST) route
 */

exports.loginPost = function(req, res) {
  res.render("login", {
    "title": "Login"
  });
};
