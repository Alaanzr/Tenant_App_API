describe('tenantApp', function() {
  beforeEach(module('tenantApp'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('tenantApp');
  }));
});
