/**
 * Animal Shougi Client Program
 */

// ----------------------------------------------
// Websocket Process
var socket = io.connect('http:/' + location.host);

socket.on('connect', function() {
  socket.on('board', function(){
    //
  });

  socket.on('result', function(){
    //
  });

  socket.on('users', function(){
    //
  });

  socket.on('message', function(){
    //
  });
});

