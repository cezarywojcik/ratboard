/**
 * File: sockethandler.js
 * Desc: This file handles socket interaction.
 *       Assume exports.io exists and points to the socket.io object.
 */

exports.handler = function(socket) {
  socket.on("room:join", function(data) {
    var d = new Date();
    if (!data.username || data.username.length === 0) {
      socket.emit("room:systemmessage", {
        content: "You have no username.",
        timestamp: d.toString()
      });
    } else {
      socket.join(data.room);
      exports.io.to(data.room).emit("room:systemmessage", {
        content: data.username + " has connected.",
        timestamp: d.toString()
      });
    }
  });

  socket.on("room:message", function(data) {
    exports.io.to(data.room).emit("room:message", data);
  });

  socket.on('disconnect', function() {
    // do things
  });
};
