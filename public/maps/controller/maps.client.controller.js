angular.module('maps').controller('mapsController', ['$scope', '$routeParams', '$location', 'Authentication', 'Properties', function($scope, $routeParams, $location, Authentication, Properties) {
  $scope.authentication = Authentication;


}]);
