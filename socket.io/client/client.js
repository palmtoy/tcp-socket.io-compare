var sioClient = require('socket.io-client');
var socket = null;

var start = function(host, port) {
	socket = sioClient.connect(host + ':' + port, {'force new connection': true, 'reconnect': false});
	socket.on('connect', function() {
		flush();
	});
};

var sendMessage = function(message) {
	console.error('sendMessage');
	socket.emit('message', message);
};

var flush = function() {
	setInterval(function() {
      sendMessage('123');
      }, 1000 * 5);
};


start('127.0.0.1', 3010);