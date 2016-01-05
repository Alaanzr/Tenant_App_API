angular.module('connections').controller('ConnectionController', ['$scope', '$http', '$routeParams', 'Authentication', function($scope, $http, $routeParams, Authentication) {


  $scope.authentication = Authentication;

  // var userRecv = $routeParams.user_id;
  var userSender = $scope.authentication.user.id;
  $scope.requestees = [];
  var result;

  // console.log('receiver, sender:', userRecv, userSender);

  $scope.collectUserDetails = function() {
    $http.get('/users/' + userSender).success(function(data) {
      $scope.requests_recd = data.requests_recd;
      $scope.requests_recd.forEach(function(id) {
        $http.get('/users/' + id).success(function(user) {
          console.log(user);
          $scope.requestees.push(user);
        });
      });
      $scope.data = data;
    });

    // result = $http.get('user_connection/' + userSender + '/' + userRecv);
  };

  // $scope.sendConnection = function() {
  //   $http.post('user_connection/' + userSender + '/' + userRecv).success(function(data) {
  //     console.log(data);
  //     console.log('connection added');
  //   });
  // };
  //
  //  $scope.outstandingConnections = function() {
  //    if (result == -1) {
  //      return true;
  //    }
  //  };
}]);
