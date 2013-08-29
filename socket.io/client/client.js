var util = require('util');
var sioClient = require('socket.io-client');
var socket = null;


var start = function(host, port) {
  socket = sioClient.connect(host + ':' + port,
    {'force new connection': true, 'reconnect': false});
  socket.on('connect', function() {
    flush();
  });
};

var sendMessage = function(message) {
  console.log('%j : sendMessage : %j', (new Date()).toLocaleString(), message);
  socket.emit('message', message);
};

// var totalCnt = 10000
var totalCnt = 3
  , cnt = 0
  , intervalId = 0;

var flush = function() {
  intervalId = setInterval(function() {
    var msg = util.format(
      "{ id: %d, type: 0, compressRoute: 0, route: 'onChat', body: '{Hello world!}' }", ++cnt);
    sendMessage(msg);
    if (cnt >= totalCnt && intervalId) {
      clearInterval(intervalId);
      process.exit();
    }
  }, 100);
};

start('10.120.144.102', 9995);
