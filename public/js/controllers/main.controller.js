(function() {
  angular.module('music-box')
        .controller('MainController', MainController);

  MainController.$inject = ['$scope', 'AlbumService'];

  function MainController($scope, AlbumService) {
    $scope.albums = AlbumService.get();
    $scope.selectAlbum = selectAlbum;
    $scope.createAlbum = createAlbum;
    $scope.deleteAlbum = deleteAlbum;
    $scope.editAlbum = editAlbum;
    $scope.saveAlbum = saveAlbum;
    $scope.newAlbum = newAlbum;
    $scope.selectedAlbum = '';
    $scope.selectedAlbumIndex = 0;
    $scope.enteringAlbum = false;

    $scope.$watch(function(){
      return AlbumService.get();
    }, function(){
    $scope.albums = AlbumService.get();
    });
    function selectAlbum(album, index) {
      setAll();
      album.isSelected = true;
      $scope.enteringAlbum = false;
      $scope.selectedAlbum = album;
      $scope.selectedAlbumIndex = index;
    }
    function newAlbum() {
      setAll();
      $scope.selectedAlbum = '';
      $scope.enteringAlbum = true;
    }
    function createAlbum(newAlbum) {
      AlbumService.create(newAlbum);
      $scope.newAlbum = '';
      $scope.enteringAlbum = false;
    }
    function deleteAlbum(index) {
      AlbumService.delete(index);
    }
    function editAlbum(album) {
      album.isBeingEdited = true;
    }
    function saveAlbum(index, editedAlbum) {
      AlbumService.update(index, editedAlbum);
      editedAlbum.isBeingEdited = false;
    }

    function setAll() {
      var i, n = $scope.albums.length;
      for (i = 0; i < n; ++i) {
          $scope.albums[i].isSelected = false;
      }
    }
  }
}());
