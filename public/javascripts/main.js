/**
 * Animal Shougi Client Program
 */

// ----------------------------------------------
// Websocket Process
var socket = io.connect('http://' + location.host);

socket.on('connect', function() {
  socket.on('board', function(){
    alert('Debug : socket.on board'); 
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


// ----------------------------------------------
// init 
var loginName = "";

function init(){
  setEvent();
}

// setEvent
function setEvent(){
  $('#login').click(login);
} 

// login
function login(){
  loginName = $('#loginName').val();
  if(loginName == ''){
    alert('Name is Empty!');
  }
  socket.emit('login', {name : loginName}); 
}
