function updateBoard(){
  var i, j;
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
        $(boardIndex).bind('click', [boardIndex, pieceClass], pieceClick); 
      } else {
        $(boardIndex).html('');
        $(boardIndex).click();
      }
    }
  }
}

function updateOwner(){
  var i, j;
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 3; j++){
      if(currentBoard[i][j]) {
        var piece = currentBoard[i][j];
        pieceOwner[i][j] = piece.charAt(0);
      }else{
        pieceOwner[i][j] = null;
      }
    }
  }
}

function pieceClick(event){
  var pieceId    = event.data[0],
      pieceClass = event.data[1];
  switch(pieceClass) {
  case "lion" :
    break;
  case "giraffe":
    break;
  case "elephant":
    break;
  case "chick":
    break;
  case "pollo":
    break;
  default :
    break;
  }
}


function highLight(boardIndex){
  console.log('highLight:' + boardIndex);
  $("#" + boardIndex).css('border-color', '#FF0000');
}

