/**
 * File: sockethandler.js
 * Desc: This file handles socket interaction
 */

exports.handler = function(socket) {
  socket.on("connected", function(data) {
    console.log("connected");
  });
};
