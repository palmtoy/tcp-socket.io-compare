var path = require('path');
var util = require('util');
var sioClient = require('socket.io-client');
var socket = null;
var fs = require('fs');


// var logFD = fs.openSync('./msg.log', 'w');

var start = function(host, port) {
  socket = sioClient.connect(host + ':' + port,
    {'force new connection': true, 'reconnect': false});
  socket.on('connect', function() {
    flush();
  });
};

var sendMessage = function(message) {
  socket.emit('message', message);
  var tmpStr = util.format('%j : sendMessage : %j\n', (new Date()).toLocaleString(), message);
  console.log(tmpStr);
  // fs.write(logFD, tmpStr);
};

var totalCnt = 70000
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
  }, 0);
};

start('10.120.144.102', 9995);


/*
 kill -SIGUSR2 <pid>
 http://localhost:9998/inspector.html?host=localhost:9999&page=0

var devtoolsAgent = require('webkit-devtools-agent');
var express = require('express');
var expressSvr = express.createServer();
expressSvr.use(express.static(path.resolve(__dirname, '../../devtools_agent_page')));
expressSvr.listen(9996);

if (!!devtoolsAgent) {
  process.kill(process.pid, 'SIGUSR2');
}
 */
