/**
 * Animal Shougi Client Program
 */

// ----------------------------------------------
// Websocket Process
var socket = io.connect('http://' + location.host);
var columnIndexArray = ['a', 'b', 'c'];

socket.on('connect', function() {
  socket.on('board', function(data){
    // 現在の盤面
    var i, j;
    var currentBoard = data.board;
    for (i = 0; i < 3; i++) {
      for (j = 0; j < 4; j++){
        if(currentBoard[i][j]) {
          var piece = currentBoard[i][j];
          var temp = j + 1;
          var boardIndex = "#" + columnIndexArray[i] + temp;
          var pieceKind = piece.charAt(1);
          var pieceClass, pieceName;
          switch(pieceKind){
          case 'L' :
            pieceClass = "lion";
            pieceName = "獅";
            break;
          case 'E' :
            pieceClass = "elephant";
            pieceName = "象";
            break;
          case 'G' :
            pieceClass = "giraffe"
            pieceName = "馬";
            break;
          case 'C' :
            pieceClass = "chick";
            pieceName = "雛";
            break;
          case 'P' :
            pieceClass = "pollo";
            pieceName = "鶏";
            break;
          default :
            break;
          }
          $(boardIndex).html('<div class="' + pieceClass + '">' + pieceName + '</div>');
        }
      }
    }
    
    // どっちの手番かを取得して表示してね
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
  initBoard();
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
