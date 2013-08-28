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
  console.error('sendMessage');
  socket.emit('message', message);
};

var totalCnt = 20000
  , cnt = 0
  , intervalId = 0;

var flush = function() {
  intervalId = setInterval(function() {
    sendMessage('123');
    if (++cnt >= totalCnt && intervalId) {
      clearInterval(intervalId);
    }
  }, 50);
};


start('127.0.0.1', 3010);