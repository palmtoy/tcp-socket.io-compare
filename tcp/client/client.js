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

var sendMessage = function(reqId, route, msg) {
  msg = encode(reqId, route, msg);
  var packet = Package.encode(Package.TYPE_DATA, msg);
  send(packet);
};

var send = function(packet){
  socket.write(packet, {binary: true}, function(err) {
    if(err) {
      console.error('send binary data error.');
    }
  });
};

start('127.0.0.1', 3005);

sendMessage(1, 'onChat', '{key: 1, value:2}');
