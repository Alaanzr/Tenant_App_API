angular.module('maps').config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/maps', {
    templateUrl: '/maps/views/maps.client.view.html'
  });
}]);
