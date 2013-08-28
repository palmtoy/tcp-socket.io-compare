var io = require('socket.io').listen(3010);


io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('message', function (data) {
    console.log(data);
  });
});