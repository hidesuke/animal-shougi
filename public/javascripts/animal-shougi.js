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

function pieceClick(event){
  var pieceId    = event.data[0],
      pieceClass = event.data[1];
  switch(pieceClass) {
  case "lion" :
    hlLion(pieceId);
    break;
  case "giraffe":
    break;
  case "elephant":
    break;
  case "chick":
    break;
  case "pollo":
    hlPollo(pieceId);
    break;
  default :
    break;
  }
}


function highLight(boardIndex){
  console.log('highLight:' + boardIndex);
  $(boardIndex).css('border-color', '#FF0000');
}

function hlLion(pieceId) {
  var coordinate = id2co(pieceId);
  var candidates = [];
  if(coordinate.x - 1 >= 0) {
    candidates.push({x : coordinate.x - 1, y : coordinate.y});
    if (coordinate.y - 1 >= 0) {
      candidates.push({x : coordinate.x - 1, y : coordinate.y - 1}); 
    }
    if (coordinate.y + 1 < 4) {
      candidates.push({x : coordinate.x - 1, y : coordinate.y + 1}); 
    }
  }
  if (coordinate.x + 1 < 3) {
    candidates.push({x : coordinate.x + 1, y : coordinate.y});
    if (coordinate.y - 1 >= 0) {
      candidates.push({x : coordinate.x + 1, y : coordinate.y - 1}); 
    }
    if (coordinate.y + 1 < 4) {
      candidates.push({x : coordinate.x + 1, y : coordinate.y + 1}); 
    }
  }
  if (coordinate.y - 1 >= 0) {
    candidates.push({x : coordinate.x, y : coordinate.y - 1}); 
  }
  if (coordinate.y + 1 < 4) {
    candidates.push({x : coordinate.x, y : coordinate.y + 1}); 
  }
  var len = candidates.length, i;
  for(i = 0; i < len; i++) {
    var tempId = co2id(candidates[i].x, candidates[i].y);
    $(tempId).css("border", "solid 4px red");
  }
}

function hlPollo(pieceId) {
  var coordinate = id2co(pieceId);  
  var move; // 動き方
  var candidates = [];
  if(pieceOwner[coordinate.y][coordinate.x] == 1){ 
    move = [[-1,-1], [0, -1], [1, -1], [-1, 0], [1, 0], [0, 1]];
  }else if(pieceOwner[coordinate.y][coordinate.x] == 2){
    move = [[-1,1], [0, 1], [1, 1], [-1, 0], [1, 0], [0, -1]];
  }

  // 自分自身のハイライト
  highLight(pieceId);

  // Check
  for (var i = 0; i < move.length ; i++){
    var m = move[i],
        mx = coordinate.x + m[0],
        my = coordinate.y + m[1];

    if(mx < 0 || mx > 2 || my < 0 || my > 3){
      continue;
    }
    
    candidates.push({x : mx, y : my});
  }

  // 候補のセルをハイライト
  for (var i = 0; i < candidates.length ; i++){
    var tempId = co2id(candidates[i].x, candidates[i].y);
    $(tempId).css("border", "solid 4px red");
  }  
}

function id2co(tid) {
  var tempX = tid.charAt(1),
      tempY = tid.charAt(2);
  var y = parseInt(tempY, 10) - 1,  
      x = tempX === 'a' ? 0 : tempX === 'b' ? 1 : 2;
  return {x : x, y : y}                                                                
}

function co2id(x, y) {
  var column = x === 0 ? 'a' : x === 1 ? 'b' : 'c';
  var row = y + 1;
  return "#" + column + row;
}
