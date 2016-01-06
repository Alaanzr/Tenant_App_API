angular.module('main').controller('MainController', ['$scope', 'Authentication', '$http', '$route', function($scope, Authentication, $http, $route) {
  $scope.authentication = Authentication;

  $scope.editStatus = false;

  $scope.changeEditStatus = function() {
    $scope.editStatus = true;
  };

  $scope.updateProfile = function() {
    var userData = {
      currentArea: $scope.description,
      image: $scope.image
    };

    $http.put('/users/' + $scope.authentication.user.id, userData).success(function(data) {
      $scope.editStatus = false;
    });
    $route.reload();
  };
}]);

// $scope.acceptConnection = function(index) {
//   $http.put('user_connection/' + $scope.requests_recd[index].id + '/' + userRecv).success(function(name){
//     console.log('name:', name);
//     console.log('end of the accept', $scope.requests_recd[index].id);
//   });
//   console.log('hello accept');
// };
