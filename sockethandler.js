/**
 * File: sockethandler.js
 * Desc: This file handles socket interaction.
 *       Assume exports.io exists and points to the socket.io object.
 */

exports.handler = function(socket) {
  socket.emit("test", {swag : "yolo"});

  socket.on('disconnect', function () {
    console.log("disconnected");
  });
};
