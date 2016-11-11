var express = require('express');
var server = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var albumRouter = require('./server/routers/album.router.js');
var mongoURI = process.env.MONGOURI || require('./config.js').mongoURI;

mongoose.connect(mongoURI);
server.use(albumRouter);

server.get('/', function(req, res){
  res.send('OK');
});

server.listen(port, function() {
  console.log('Now listening on port: '+port);
});
