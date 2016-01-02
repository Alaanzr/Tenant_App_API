angular.module('users').controller('UserController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

  $scope.collectUserDetails = function() {
    $http.get('/users/' + $routeParams.user_id).success(function(data) {
      $scope.data = data;
    });
  };
}]);
