angular.module('users').controller('connectionController', ['$scope', '$http', '$routeParams', 'Authentication', function($scope, $http, $routeParams, Authentication) {

    $scope.collectUserDetails = function() {
    $http.get('/users/' + $routeParams.user_id).success(function(data) {
      $scope.data = data;
    });
  };
}]);
