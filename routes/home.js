/**
 * File: home.js
 * Desc: the / route
 */

exports.home = function(req, res) {
  res.render("home", {
    "title": "Home"
  });
};
