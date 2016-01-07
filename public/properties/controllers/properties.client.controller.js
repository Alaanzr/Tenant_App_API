angular.module('properties').controller('PropertyController', ['$http', '$scope', '$routeParams', '$location', 'Authentication', 'Properties', '$window', function($http, $scope, $routeParams, $location, Authentication, Properties, $window) {
  $scope.authentication = Authentication;

  $scope.createUserProperty = function() {
    var property = {
      post_code: this.post_code,
      street_name: this.street_name,
      property_type: this.property_type,
      contract_start: this.contract_start,
      contract_end: this.contract_end
    };

    $http.post("/properties").success(function(property) {
      }).then(function(){
        $window.location.reload();
      });
        $location.path('#!/');
  };

}]);
