(function() {
  angular.module('music-box')
        .factory('AlbumService', AlbumService);

  AlbumService.$inject = ['$http'];

  function AlbumService($http) {
    init();
    var albums = [];
    return {
      get: getAllAlbums,
      create: createOneAlbum,
      update: updateOneAlbum,
      delete: deleteOneAlubm
    };

    function init() {
      $http.get('/albums')
          .then(function(res) {
            albums = res.data.albums;
          })
          .catch(function(err) {
            console.log(err);
          });
    }

    function getAllAlbums() {
      return albums;
    }
    function createOneAlbum(newAlbum) {
      $http.post('/albums', newAlbum)
          .then(function(res) {
            albums.push(newAlbum);
            init();
          })
          .catch(function(err) {
            console.log(err);
          });
    }
    function updateOneAlbum(index, updatedAlbum) {
      $http.put('/albums/'+updatedAlbum._id, updatedAlbum)
          .then(function(res) {
            albums[index] = updatedAlbum;
          })
          .catch(function(err) {
            console.log(err);
          });
    }
    function deleteOneAlubm(index) {
      $http.delete('/albums/'+albums[index]._id)
          .then(function(res) {
            albums.splice(index, 1);
            init();
          })
          .catch(function(err) {
            console.log(err);
          });
    }
  }
}());
