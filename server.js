
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
// WebSocket

io.sockets.on('connection', function(socket) {
  socket.on('login', function() {
  });
  socket.on('sitdown', function(){
  });
  socket.on('message_send', function(data) {
  });
  socket.on('turn', function(data) {
  });
  socket.on('resign',function(data){
  });
});


