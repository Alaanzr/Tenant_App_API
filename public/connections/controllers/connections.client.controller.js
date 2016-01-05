angular.module('connections').controller('ConnectionController', ['$scope', '$http', '$routeParams', 'Authentication', function($scope, $http, $routeParams, Authentication) {


  $scope.authentication = Authentication;

  var user1 = '568b93173cb22afd0b43e1aa';
  var user2 = '568ba5226a360dd003a8fa54';



  // var userRecv = $routeParams.user_id;
  var userRecv = $scope.authentication.user.id;
  $scope.requestees = [];
  // console.log('receiver, sender:', userRecv, userSender);

  $scope.collectUserDetails = function() {
    $http.get('/users/' + userRecv).success(function(data) {
      $scope.requests_recd = data.requests_recd;
      console.log('request_received', $scope.requests_recd);
      $scope.requests_recd.forEach(function(user) {
        $http.get('/users/' + user.id).success(function(user) {
          console.log(user);
          $scope.requestees.push(user);
          console.log('requestees:', $scope.requestees);
        });
      });
      $scope.data = data;
    });

    // result = $http.get('user_connection/' + userSender + '/' + userRecv);
  };

  $scope.acceptConnection = function(index) {
    $http.put('user_connection/' + $scope.requests_recd[index].id + '/' + userRecv).success(function(name){
      console.log('name:', name);
      console.log('end of the accept', $scope.requests_recd[index].id);
    });
    console.log('hello accept');
  };

  $scope.rejectConnection = function() {
    console.log('hello reject');
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
