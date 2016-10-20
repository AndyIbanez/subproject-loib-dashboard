var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

//Serve up static files
app.use(express.static(__dirname + '/public'));

server.listen(port, function() {
  console.log('server listening at port %d', port)
});

//Handle Socket.io connections
// data is in JSON format {"deviceid":,"accx":,"accy":,"accz":,"gyrox":,"gyroy":,"gyroz":}
io.on('connection', function(socket) {
  socket.on('message', function(data) {
    console.log('got data' + data.accx);
    socket.broadcast.emit('message', data);
  });
});
