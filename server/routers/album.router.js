var express = require('express');
var router = express.Router();
var Album = require('../models/album.model.js');
var bodyParser = require('body-parser');

// bodyParser helps the router know how to parse json and encoded urls
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

// now define our 5 router methods
router.get('/albums', function(req, res) {
  Album.find({}, function(err, foundAlbums) {
    if(err) {
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      albums: foundAlbums
    });
  });
});
router.get('/albums/:id', function(req, res) {
  Album.find({_id: req.params.id}, function(err, foundAlbums) {
    if(err) {
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      albums: foundAlbums
    });
  });
});
router.get('/albums/date/:date', function(req, res) {
  var queryDate = new Date(req.params.date);
  Album.find({releaseDate: queryDate}, function(err, foundAlbums) {
    if(err) {
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      albums: foundAlbums
    });
  });
});
router.post('/albums', function(req, res) {
  var album = new Album(req.body);
  album.save(function(err) {
    if(err) {
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      msg: 'successfully created album'
    });
  });
});
router.put('/albums/:id', function(req, res) {
  Album.findOneAndUpdate({_id: req.params.id}, req.body, function(err, oldAlbum) {
    if(err) {
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      oldAlbum: oldAlbum
    });
  });
});
router.delete('/albums/:id', function(req, res) {
  Album.findOneAndRemove({_id: req.params.id}, function(err, oldAlbum) {
    if(err) {
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      oldAlbum: oldAlbum
    });
  });
});

module.exports = router;
