
/**
 * Module dependencies.
 */

var express = require('express'),
    json    = JSON.stringify;
var app     = module.exports = express.createServer();
var io      = require('socket.io').listen(app);

// -------------------------------------------------------
// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// -------------------------------------------------------
// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'どうぶつしょうぎのもり'
  });
});

if (app.settings.env === 'production') {
  app.listen(80);
} else {
  app.listen(3000);
}

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

// -------------------------------------------------------
// Game Init
var board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

var turn = null,
    firstPlayer  = null,
    secondPlayer = null;


// -------------------------------------------------------
// WebSocket

io.sockets.on('connection', function(socket) {
  console.log('connected');

  socket.on('login', function(data) {
    console.log('logined:' + data.name);

    // Set Login Name
    socket.set('loginName', data.name, null);

    // Emit Board
    io.sockets.emit('board', {
      board : board,
      turn : turn,
      first : firstPlayer,
      second : secondPlayer 
    });
  });
  
  socket.on('sitdown', function(data) {
    socket.set('turn', data.turn, null);
    if(data.turn == 'first') {
      socket.get('loginName', function(err, name) {
        firstPlayer = name;
      });
    } else if (data.turn == 'second') {
      socket.get('loginName', function(err, name) {
        secondPalyer = name;
      });
    }
    if (firstPlayer != null && secondPlayer != null) {
      turn = 'first';
      board = [
        ['sG', 'sL', 'sE'],
        [null, 'sC', null],
        [null, 'fC', null],
        ['fE', 'fL', 'fG'],
      ];
      io.sockets.emit('board', {
        board : board,
        turn : turn,
        first : firstPlayer,
        second : secondPlayer 
      });
    }
  });
  
  socket.on('message_send', function(data) {
  });
  socket.on('turn', function(data) {
    // TODO : boardのupdate
    var nextPlayer = data.turn === 'first' ? 'second' : 'first';
    io.sockets.emit('turn', {
      turn : nextPlayer,
      point : data.point
    });
    // TODO:resultを返す
  });
  
  socket.on('resign', function() {
    var looser, myturn;
    socket.get('loginName', function(err, name) {
      looser = name; 
    });
    socket.get('turn', function(err, turn) {
      myturn = turn; 
    });
    turn = null;
    io.sockets.emit('result', {
      board : board,
      winner : myturn === 'first' ? 'second' : 'first',
      turn : turn
    });
  });
});



