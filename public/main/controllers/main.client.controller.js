angular.module('main').controller('MainController', ['$scope', 'Authentication', function($scope, Authentication) {
  $scope.authentication = Authentication;

  $scope.editStatus = false;

  $scope.changeEditStatus = function() {
    $scope.editStatus = true;
  };

  $scope.updateProfile = function() {
    $scope.editStatus = false;
  };
}]);
