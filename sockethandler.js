/**
 * File: sockethandler.js
 * Desc: This file handles socket interaction.
 *       Assume exports.io exists and points to the socket.io object.
 */

exports.handler = function(socket) {
  socket.on("connected", function(data) {
    console.log("connected");
  });

  socket.on('disconnect', function () {
    console.log("disconnected");
  });
};
