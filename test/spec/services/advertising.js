'use strict';

describe('Service: advertising', function () {

  // load the service's module
  beforeEach(module('santeplusApp'));

  // instantiate service
  var advertising;
  beforeEach(inject(function (_advertising_) {
    advertising = _advertising_;
  }));

  it('should do something', function () {
    expect(!!advertising).toBe(true);
  });

});
