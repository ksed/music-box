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
    $scope.selectedAlbum = [];
    $scope.selectedIndex = 0;
    $scope.albumSelected = false;
    $scope.enteringAlbum = false;
    $scope.blankAlbum = {};

    $scope.$watch(function(){
      return AlbumService.get();
    }, function(){
    $scope.albums = AlbumService.get();
    });
    function selectAlbum(album, index) {
      if($scope.enteringAlbum) {$scope.enteringAlbum = false;}
      $scope.albumSelected = true;
      $scope.selectedAlbum = album;
      $scope.selectedIndex = index;
    }
    function newAlbum() {
      if($scope.albumSelected) {$scope.albumSelected = false;}
      $scope.enteringAlbum = true;
      $scope.blankAlbum = {};
    }
    function createAlbum(newAlbum) {
      AlbumService.create(newAlbum);
      selectAlbum(newAlbum, $scope.albums.length);
    }
    function deleteAlbum(index) {
      AlbumService.delete(index);
      $scope.albumSelected = false;
      $scope.enteringAlbum = false;
      $scope.albums = AlbumService.get();
    }
    function editAlbum(album) {
      album.isBeingEdited = true;
    }
    function saveAlbum(index, editedAlbum) {
      AlbumService.update(index, editedAlbum);
      editedAlbum.isBeingEdited = false;
    }
  }
}());
