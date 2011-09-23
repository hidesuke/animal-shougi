/**
 * Animal Shougi Client Program
 */

// ----------------------------------------------
// Websocket Process
var socket = io.connect('http://' + location.host);
var columnIndexArray = ['a', 'b', 'c'];
var currentBoard;

socket.on('connect', function() {
  socket.on('board', function(data){
    // 現在の盤面
    currentBoard = data.board;

    // drawCell and set Event
    updateBoard();

    // Set Name
    setUserName(data.first, data.second); 
    
    // TODO:どっちの手番かを取得して表示してね
    var currentTurn = data.turn;
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
  $('#sitDownFirst').click(function(){
    sitDown('first');
  });
  $('#sitDownSecond').click(function(){
    sitDown('second');
  });

} 

// login
function login(){
  loginName = $('#loginName').val();
  if(loginName == ''){
    alert('Name is Empty!');
  }
  socket.emit('login', {name : loginName}); 
}

function sitDown(sitTurn){
  socket.emit('sitdown', {turn : sitTurn}); 
  hideSitDownButton();
}

function setUserName(first, second){
  if(first){
    $('#name_first').html('<p>' + first + '</p>');
  }

  if(second){
    $('#name_second').html('<p>' + second + '</p>');
  }
}

function hideSitDownButton(){
  $('#sitDownFirst').hide();
  $('#sitDownSecond').hide();
}

