const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMesseges, generateLocationMessages} = require('./utils/message.js')
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO().listen(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');
  // send to admin

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id)
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessege', generateMesseges(params.name, 'Welcome to the chat app!'));
    socket.broadcast.to(params.room).emit('newMessege', generateMesseges('', `${params.name} has joined`));


    callback();
  });

  socket.on('createMessege', (message, callback) => {
    var user = users.getUser(socket.id);
    if(user && isRealString(message.text)){
      io.to(user.room).emit('newMessege', generateMesseges(message.from, message.text))
    }
    io.emit('newMessege', generateMesseges(message.from, message.text));
    if(callback){
      callback({
          statusMsg: 'Request was succsessful'
        });
      }
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if(user && isRealString(message.text)){
      io.to(user.room).emit('newMessege', generateMesseges(message.from, message.text))
    }
    io.emit('newLocationMessage', generateLocationMessages(user.name, coords.latitude, coords.longitude))
  })

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessege', generateMesseges('Admin', `${user.name} has left`))
    }
  });
});

server.listen(8888, () => {
  console.log(`Listening on port ${port}`);
});
