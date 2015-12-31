angular.module('maps').controller('mapsController', ['$scope', '$routeParams', '$location', 'Authentication', 'Properties', function($scope, $routeParams, $location, Authentication, Properties) {
  $scope.authentication = Authentication;

  geolocation.getLocation().then(function(data){
  coords = {lat:data.coords.latitude, lng:data.coords.longitude};
  $scope.formData.longitude = parseFloat(coords.lng).toFixed(3);
  $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
  //$scope.formData.htmlverified = "Yep (Thanks for giving us real data!)";

  gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

});

  $scope.createUserProperty = function() {
    var property = new Properties({
      post_code: this.post_code,
      street_name: this.street_name,
      property_type: this.property_type,
      contract_start: this.contract_start,
      contract_end: this.contract_end
    });

    property.$save(function(response) {
      // $scope.authentication.user.properties.push({post_code: response.post_code,
      // street_name: response.street_name});
      $location.path('properties/' + response._id);
    }, function(errorResponse) {
      $scope.error = errorResponse.data.message;
    });
  };

}]);
