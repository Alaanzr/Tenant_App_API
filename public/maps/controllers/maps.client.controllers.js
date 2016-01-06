angular.module('maps').controller('MapsController', ['$scope', '$http', 'geolocation', 'Authentication', 'gservice', '$rootScope', 'postcodeConv', function($scope, $http, geolocation, Authentication, gservice, $rootScope, postcodeConv) {
  $scope.authentication = Authentication;
  // Initializes Variables
  $scope.formData = {};
  var coords = {};
  var lat = 0;
  var long = 0;

  // Set initial coordinates to the center of the US
  latitude = 51.500;
  longitude = -0.138;

  // Get user's actual coordinates based on HTML5 at window load
  geolocation.getLocation().then(function(data) {
    // Set the latitude and longitude equal to the HTML5 coordinates
  coords = {lat:data.coords.latitude, long:data.coords.longitude};
  $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
  $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);

  console.log(coords);
  //gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
});

// Get coordinates based on mouse click
// $rootScope.$on("clicked", function() {
//
//   // Run the gservice functions associated with identifying coordinates
//   //$scope.$apply(function() {
//     $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
//     latitude = $scope.formData.latitude;
//     $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
//     longitude = $scope.formData.longitude;
//     console.log("formData from controller onClick", $scope.formData);
//   });
  //});

  $scope.autolocate = function() {
    gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
  };


  // Updates the user document in MongoDB
  $scope.updateUserDetails = function() {

    if(!$scope.authentication.user) {
      window.alert("Please log in");
    }

    postcodeConv.getLocation($scope.authentication.user, $scope.formData.desiredLocation, function() {
      console.log('GEOCODER SUCCESS');
      var userData = {
        desiredLocation: postcodeConv.desiredLocationPoints,
        location: [$scope.formData.longitude, $scope.formData.latitude],
      } ;

      // Saves the user data to the db
      $http.put('/users/' + $scope.authentication.user.id, userData).success(function(data) {

        // Once complete, clear the form (except location)
        $scope.formData.desiredLocation = "";
        gservice.refresh(data.desiredLocation[0], data.desiredLocation[1]);
        console.log(data);
        console.log('UPLOAD SUCCESS');
      }).error(function(data) {
        console.log('Error:' + data);
      });
    });

    };
}]);
