angular.module('properties').factory('Properties', ['$resource', function($resource) {
  return $resource('api/properties/:propertyId', {
    propertyId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}]);
