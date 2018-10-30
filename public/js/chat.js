var socket = io();

$(document).ready(function(){

  function scrollToBottom(){
    // selectors
    // console.log("calling this function");
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    //heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessegeHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    // console.log(clientHeight + ' ' + newMessegeHeight)

    if(clientHeight + scrollTop + newMessegeHeight + lastMessageHeight >= scrollHeight){
      messages.scrollTop(scrollHeight);
    }
  }

  socket.on('connect', function() {
    var params = $.deparam(window.location.search);
    socket.emit('join', params, function(err) {
      if(err){
        alert(err);
        window.location.href = '/';
      }
      else{
          console.log('No Error')
      }
    });
    //console.log('connected to the server');
  });

  socket.on('disconnect', function() {
    console.log('disconnect from the server');
  });

  socket.on('updateUserList', function(users) {
    var ol = $('<ol></ol>');

    users.forEach(function(user) {
      ol.append($('<li></li>').text(user));
    });
    $('#users').html(ol)
  });

  socket.on('newMessege', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
      text: message.text,
      from: message.from,
      createdAt: formattedTime
    });

    $("#messages").append(html);
    scrollToBottom();
  });

  $('#message-form').on('submit', function(e){
    e.preventDefault();
    var messageTextbox = $('[name=message]');
    // console.log(messageTextbox);
    socket.emit('createMessege', {
      text: messageTextbox.val()
    }, function(){
        messageTextbox.val('')
    });
  });

  var locationButton = $('#send-location')

  locationButton.on('click', function(){
    if(!navigator.geolocation){
      return alert('Gerlocation not supported by the browser');
    }
    locationButton.attr('disabled', 'disabled').text('Sending Location ...');
    navigator.geolocation.getCurrentPosition(function(pos){
      locationButton.removeAttr('disabled').text('Send Location');
      socket.emit('createLocationMessage', {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      });
    }, function(){
      locationButton.removeAttr('disabled').text('Send Location');
      alert('Unable to fetch the location');
    });
  });

  socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $("#location-message-template").html()
    var html = Mustache.render(template, {
      url: message.url,
      from: message.from,
      createdAt: formattedTime
    });
    // var li = $('<li></li>');
    // var a = $('<a target="_blank">My current location</a>');
    //
    // li.text(`${message.from} ${formattedTime} `)
    // a.attr('href', message.url);
    // li.append(a);
    $('#messages').append(html);
    scrollToBottom();
  });
});
