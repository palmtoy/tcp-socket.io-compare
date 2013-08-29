var io = require('socket.io').listen(9995);
var path = require('path');


io.sockets.on('connection', function (socket) {
  socket.on('message', function (data) {
    console.log('msg: ', data);
  });
});

/*
 kill -SIGUSR2 <pid>
 http://localhost:9998/inspector.html?host=localhost:9999&page=0
*/
require('webkit-devtools-agent');
var express = require('express');
var expressSvr = express.createServer();
expressSvr.use(express.static(path.resolve(__dirname, '../../devtools_agent_page')));
expressSvr.listen(9997);

console.log('[pid = %d] ~ Socket.io server is running ...', process.pid);
