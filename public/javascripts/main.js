/**
 * Animal Shougi Client Program
 */

// ----------------------------------------------
// Websocket Process
var socket = io.connect('http://' + location.host);
var columnIndexArray = ['a', 'b', 'c'];
var currentBoard;
var pieceOwner;
var myName = null,
    myTurn = null;


socket.on('connect', function() {
  socket.on('board', function(data){
    if(!myName) {
      return;
    }
    // ログイン画面を消して、盤面を表示するお
    $('article').css("display","block");
    $('#login_form').css("display", "none");
   
    // おなまえを表示するお
    if (data.first) {
      $('#sitDownFirst').css('display', 'none');
      $('#name_first').html("先手 : " + data.first); 
    }
    if (data.second) {
      $('#sitDownSecond').css('display', 'none');
      $('#name_second').html("後手 : " + data.second);
    }
    if (myTurn) {
      $('#sitDownFirst').css('display', 'none');
      $('#sitDownSecond').css('display', 'none');
    }
    
    // 現在の盤面
    currentBoard = data.board;

    // drawCell and set Event
    updateBoard();
    updateOwner();

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

  pieceOwner = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
}  

// setEvent
function setEvent(){
  $('#login').click(login);
  $('#sitDownFirst').click(function(){
    myTurn = 1;
    sitDown('first');
  });
  $('#sitDownSecond').click(function(){
    myTurn = 2;
    sitDown('second');
  });

} 

// login
function login(){
  loginName = $('#loginName').val();
  if(loginName == ''){
    alert('Name is Empty!');
  }
  myName = loginName;
  socket.emit('login', {name : loginName}); 
}

function sitDown(sitTurn){
  socket.emit('sitdown', {turn : sitTurn}); 
}

