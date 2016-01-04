angular.module('properties').config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/properties/create', {
    templateUrl: 'properties/views/create-property.client.view.html'
  });
}]);
