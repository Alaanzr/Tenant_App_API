describe('tenantApp', function() {
  beforeEach(module('tenantApp'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('tenantApp');
  }));

  it('initialises with an empty page', function() {
    expect(ctrl.tenantAppCtrl).toBeUndefined();
  });
});
