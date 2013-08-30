var net = require('net');
var protocol = require('pomelo-protocol');
var Package = protocol.Package;
var Message = protocol.Message;
var socket = null;


var start = function(host, port) {
	socket = net.connect({port: port, host: host}, function(err) {
		if(err) {
			console.error('connect error!!!');
		}
  });
};

var encode = function(reqId, route, msg) {
  var type = reqId ? Message.TYPE_REQUEST : Message.TYPE_NOTIFY;
  msg = protocol.strencode(JSON.stringify(msg));
  return Message.encode(reqId, type, 0, route, msg);
};

var send = function(packet){
  socket.write(packet, null, function(err) {
    if(err) {
      console.error('send binary data error.');
    }
  });
};

var totalCnt = 7000
  , cnt = 0
  , intervalId = 0;

var sendMessage = function(reqId, route, msg) {
  console.log('%j : sendMessage : %j', (new Date()).toLocaleString(), cnt);
  msg = encode(reqId, route, msg);
  var packet = Package.encode(Package.TYPE_DATA, msg);
  send(packet);
};

intervalId = setInterval(function() {
  sendMessage(++cnt, 'onChat', '{Hello world!}');
  if (cnt >= totalCnt && intervalId) {
    clearInterval(intervalId);
    process.exit();
  }
}, 50);

start('10.120.144.102', 9997);

/*
 kill -SIGUSR2 <pid>
 http://localhost:9998/inspector.html?host=localhost:9999&page=0
*/
var devtoolsAgent = require('webkit-devtools-agent');
var express = require('express');
var expressSvr = express.createServer();
expressSvr.use(express.static(path.resolve(__dirname, './devtools_agent_page')));
expressSvr.listen(9998);

if (devtoolsAgent) {
  process.kill(process.pid, 'SIGUSR2');
}
