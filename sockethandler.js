/**
 * File: sockethandler.js
 * Desc: This file handles socket interaction.
 *       Assume exports.io exists and points to the socket.io object.
 */

exports.handler = function(socket) {
  socket.on("room:join", function(data) {
    socket.join(data.room);
  });

  socket.on("room:message", function(data) {
    exports.io.to(data.room).emit("room:message", data);
  });

  socket.on('disconnect', function () {
    console.log("disconnected");
  });
};
