var app = angular.module("RatBoard", []);

// ---- [ services ] ----------------------------------------------------------

app.factory("socket", function($rootScope) {
  var socket = io.connect("/");
  return {
    on: function (eventName, callback, callback2) {
      socket.on(eventName, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          callback.apply(socket, args);
        });
        if (typeof callback2 !== "undefined") {
          callback2.call();
        }
      });
    },

    emit: function (eventName, data, callback, callback2) {
      socket.emit(eventName, data, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          if (callback) {
            callback.apply(socket, args);
          }
        });
        if (typeof callback2 !== "undefined") {
          callback2.call();
        }
      });
    }
  };
});

// ---- [ controller ] --------------------------------------------------------

app.controller("RatBoardController", ["$scope", "socket",
  function($scope, socket) {
  socket.on("test", function(data) {
    console.log(JSON.stringify(data));
  });
}]);
