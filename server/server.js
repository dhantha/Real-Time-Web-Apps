const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO().listen(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('createMessege', (messege) => {
    console.log('create messege', messege);
  });

  socket.emit('newMessege', {
    from: 'kevin',
    text: 'See you then',
    createdAt: 123123
  });

  socket.on('disconnect', () => {
    console.log('disconnect from the client');
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
