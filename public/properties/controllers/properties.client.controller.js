angular.module('properties').controller('PropertyController', ['$scope', '$routeParams', '$location', 'Authentication', 'Properties', function($scope, $routeParams, $location, Authentication, Properties) {
  $scope.authentication = Authentication;

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
      $location.path('#!/');
    }, function(errorResponse) {
      $scope.error = errorResponse.data.message;
    });
  };

}]);
