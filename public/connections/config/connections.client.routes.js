angular.module('connections').config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/connections/:user_id', {
    templateUrl: '/connections/views/connections.client.view.html'
  });

  }]);
