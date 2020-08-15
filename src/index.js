var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
io.on('connect', (socket) =>{
  console.log('a user connected');
  socket.on('disconnect', () =>{
    console.log('a user disconnected');
  });
});
io.on('connection', (socket) =>{
    socket.on('chat message', (msg) =>{
      console.log('message '+'han'+': '+ msg);
    });
});
io.emit('some one', {someProperty: 'some value', otherProperty: 'other value'});
io.on('connection', (socket) =>{
  socket.broadcast.emit('hi');
});
io.on('connection', (socket) =>{
  socket.on('chat message', (msg) =>{
    io.emit('chat message', msg);
  });
});
http.listen(3001, () => {
  console.log('listening on *:3001');
});
