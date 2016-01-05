angular.module('users').controller('UserController', ['$scope', '$http', '$routeParams', 'Authentication', function($scope, $http, $routeParams, Authentication) {

    $scope.authentication = Authentication;
    var userRecv = $routeParams.user_id;
    var userSender = $scope.authentication.user.id;

    $scope.collectUserDetails = function() {
    $http.get('/users/' + $routeParams.user_id).success(function(data) {
      $scope.data = data;
    });
  };

  $scope.sendConnection = function() {
    $http.post('user_connection/' + userSender + '/' + userRecv).success(function(data) {
      console.log(data);
      console.log('connection added');
    });
  };
}]);
