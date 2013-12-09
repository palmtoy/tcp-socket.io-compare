var io = require('socket.io').listen(9995);
var path = require('path');
var fs = require('fs');


var logFD = fs.openSync('./sioSvr.log', 'w');

io.sockets.on('connection', function (socket) {
  var address = socket.handshake.address;
  console.log("New connection from " + address.address + ":" + address.port);
  socket.on('message', function (data) {
    // console.log('msg: ', data);
    fs.write(logFD, 'msg: ' + data + '\n');
  });
});

console.log('[pid = %d] ~ Socket.io server is running ...', process.pid);


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
