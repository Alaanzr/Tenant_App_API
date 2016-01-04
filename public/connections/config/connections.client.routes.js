angular.module('connections').config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/connections', {
    templateUrl: '/connections/views/connections.client.view.html'
  });

  }]);
