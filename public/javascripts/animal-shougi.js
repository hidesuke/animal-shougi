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
        $(boardIndex).click(function(){
            var id = $(this).attr('id');
            var pClass = $(this).attr('class');
            pieceClick(id, pClass);
        });
         
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
        switch(piece.charAt(0)){
          case 'f' : 
            pieceOwner[i][j] = 1;
            break;
          case 's' :
            pieceOwner[i][j] = 2;
            break;
        }
      }else{
        pieceOwner[i][j] = 0;
      }
    }
  }
}

function pieceClick(boardIndex, pClass){
  highLight(boardIndex);
}

function highLight(boardIndex){
  console.log('highLight:' + boardIndex);
  $("#" + boardIndex).css('border-color', '#FF0000');
}

function hlLion(pieceId) {
  var coordinate = id2co(pieceId);  
}

function id2co(tid) {
  var tempX = tid.charAt(1),
      tempY = tid.charAt(2);
  var y = parseInt(tempY, 10), 
      x = tempX === 'A' ? 0 : tempX === 'B' ? 1 : 2;
  return {x : x, y : y}    
}

