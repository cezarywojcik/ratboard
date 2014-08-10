var app = angular.module("RatBoard", []);

// ---- [ misc functions ] ----------------------------------------------------

function getCookie(name) {
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(document.cookie);
  return (value !== null) ? unescape(value[1]) : null;
}

function encrypt(string) {
  return CryptoJS.AES.encrypt(string, window.location.hash).toString();
}

function decrypt(string) {
  return CryptoJS.AES.decrypt(string, window.location.hash)
    .toString(CryptoJS.enc.Utf8);
}

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
  // variables
  $scope.messages = [];
  $scope.input = "";
  $scope.username = getCookie("username");
  var pathArray = window.location.pathname.split("/");
  $scope.room = pathArray[pathArray.length - 1];

  // internal functions
  function init() {
    socket.emit("room:join", {
      room: $scope.room,
      username: $scope.username
    });
  }

  // scope functions
  $scope.sendMessage = function($event) {
    $event.preventDefault();
    socket.emit("room:message", {
      room: $scope.room,
      content: encrypt($scope.input),
      username: encrypt($scope.username)
    });
    $scope.input = "";
  };

  // socket handling
  socket.on("room:message", function(data) {
    data.username = decrypt(data.username);
    data.content = decrypt(data.content);
    $scope.messages.push(data);
  });

  // initialize
  init();
}]);
