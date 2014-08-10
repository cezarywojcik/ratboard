/**
 * File: login.js
 * Desc: the /login route
 */

exports.room = function(req, res) {
  res.render("room", {
    "title": req.param("room")
  });
};
