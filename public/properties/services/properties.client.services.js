angular.module('properties').factory('Properties', ['$resource', function($resource) {
  return $resource('/properties', {
    propertyId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}]);
