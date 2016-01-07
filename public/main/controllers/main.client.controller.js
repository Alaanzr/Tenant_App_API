angular.module('main').controller('MainController', ['$scope', 'Authentication', '$http', '$window', function($scope, Authentication, $http, $window) {
  $scope.authentication = Authentication;
  console.log('*********');
  console.log($scope.authentication.user.email);
  $scope.editStatus = false;
  $scope.contactDetailsStatus = false;

  $scope.changeContactStatus = function() {
    $scope.contactDetailsStatus = true;
  };

  $scope.contactDetailsAvailable = function() {
    if ($scope.authentication.user.email === '') {
      return false;
    } else {
      return true;
    }
  };

  $scope.updateContactDetails = function() {
    var userData = {
      email: $scope.email,
      mobile: $scope.mobile,
      current_location: $scope.current_location
    };

    $http.put('/users/' + $scope.authentication.user.id, userData).success(function(data) {
      $scope.contactDetailsStatus = false;
    }).then(function() {
      $window.location.reload();
    });
  };

  $scope.profileAvailable = function() {
    if ($scope.authentication.user.description === '') {
      return false;
    } else {
      return true;
    }
  };

  $scope.changeEditStatus = function() {
    $scope.editStatus = true;
  };

  $scope.updateProfile = function() {
    var userData = {
      description: $scope.description,
      profile_picture: $scope.image
    };

    $http.put('/users/' + $scope.authentication.user.id, userData).success(function(data) {
    }).then(function() {
        $window.location.reload();
    });
  };
}]);

// $scope.acceptConnection = function(index) {
//   $http.put('user_connection/' + $scope.requests_recd[index].id + '/' + userRecv).success(function(name){
//     console.log('name:', name);
//     console.log('end of the accept', $scope.requests_recd[index].id);
//   });
//   console.log('hello accept');
// };
