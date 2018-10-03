var socket = io();

socket.on('connect', function() {
  console.log('connected to the server');

  socket.emit('createMessege', {
    from: 'Dhantha Gunarathna',
    text: 'This is a text emit'
  });
});

socket.on('disconnect', function() {
  console.log('disconnect from the server');
});

socket.on('newMessege', function(messege) {
  console.log('new messege', messege);
});
