var express = require('express');
var server = express();
var albumRouter = require('./server/routers/album.router.js');
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var mongoURI = process.env.MONGOURI || require('./config.js').mongoURI;

/*  https://github.com/Automattic/mongoose/issues/4291
    Using bluebird to provides the mongoose promise functionality
    that are implicitly called by our angular $http.then() calls */
mongoose.connect(mongoURI);
mongoose.Promise = require('bluebird');

server.use(express.static(__dirname + '/public'));

server.get('/', function(req, res){
  res.sendFile('public/html/index.html', {root:__dirname});
});

server.use(albumRouter);

server.listen(port, function() {
  console.log('Now listening on port: '+port);
});
