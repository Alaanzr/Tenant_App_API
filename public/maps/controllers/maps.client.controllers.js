angular.module('maps').controller('MapsController', ['$scope', '$http', 'geolocation', 'Authentication', function($scope, $http, geolocation, Authentication) {
  $scope.authentication = Authentication;
  // Initializes Variables
  $scope.formData = {};
  var coords = {};
  var lat = 0;
  var long = 0;

  // Set initial coordinates to the center of the US
  $scope.formData.latitude = 39.500;
  $scope.formData.longitude = -98.350;

  // Updates the user document in MongoDB
  $scope.updateUserDetails = function() {
    var userData = {
      gender: $scope.formData.gender,
      age: $scope.formData.age,
      desiredLocations: $scope.formData.desiredLocations,
      location: [$scope.formData.longitude, $scope.formData.latitude],
      htmlverified: $scope.formData.htmlverifed
    };

    // Saves the user data to the db
    $http.put('/users/' + $scope.authentication.user.id, userData).success(function(data) {

    // Once complete, clear the form (except location)
    $scope.formData.gender = "";
    $scope.formData.gender = "";
    $scope.formData.age = "";
    $scope.formData.desiredLocations = "";
  }).error(function(data) {
    console.log('Error:' + data);
  });
  };
}]);
