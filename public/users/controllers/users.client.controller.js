angular.module('users').controller('UserController', ['$scope', '$http', '$routeParams', 'Authentication', function($scope, $http, $routeParams, Authentication) {


  $scope.authentication = Authentication;

  var userRecv = $routeParams.user_id;
  var userSender = $scope.authentication.user.id;

  console.log('receiver, sender:', userRecv, userSender);

  $scope.collectUserDetails = function() {
    $http.get('/users/' + userRecv).success(function(data) {
      $scope.data = data;
    });
  };

  $scope.sendConnection = function() {
    $http.post('user_connection/' + userSender + '/' + userRecv);
    console.log('connection added');
  };
}]);
