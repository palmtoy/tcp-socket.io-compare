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

var sendMessage = function(reqId, route, msg) {
  msg = encode(reqId, route, msg);
  var packet = Package.encode(Package.TYPE_DATA, msg);
  send(packet);
};

// var totalCnt = 10000
var totalCnt = 3
  , cnt = 0
  , intervalId = 0;

intervalId = setInterval(function() {
  sendMessage(++cnt, 'onChat', '{Hello world!}');
  if (cnt >= totalCnt && intervalId) {
    clearInterval(intervalId);
    process.exit();
  }
}, 100);

start('10.120.144.102', 9996);
