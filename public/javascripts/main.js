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
    for (i = 0; i < 4; i++) {
      for (j = 0; j < 3; j++){
          var temp = i + 1;
          var boardIndex = "#" + columnIndexArray[j] + temp;
        if(currentBoard[i][j]) {
          var piece = currentBoard[i][j];
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
        } else {
          $(boardIndex).html('');
        
        }
      }
    }

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

