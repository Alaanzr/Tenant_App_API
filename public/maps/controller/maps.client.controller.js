angular.module('maps').controller('mapsController', ['$scope', '$routeParams', '$location', 'Authentication', 'Properties', function($scope, $routeParams, $location, Authentication, Properties) {
  $scope.authentication = Authentication;

  geolocation.getLocation().then(function(data){
  coords = {lat:data.coords.latitude, lng:data.coords.longitude};
  $scope.formData.longitude = parseFloat(coords.lng).toFixed(3);
  $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
  //$scope.formData.htmlverified = "Yep (Thanks for giving us real data!)";

  gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

});

}]);
