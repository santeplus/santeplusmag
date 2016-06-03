'use strict';

describe('Service: advertisingService', function () {

  // load the service's module
  beforeEach(module('santeplusApp'));

  // instantiate service
  var advertisingService;
  beforeEach(inject(function (_advertisingService_) {
    advertisingService = _advertisingService_;
  }));

  it('should do something', function () {
    expect(!!advertisingService).toBe(true);
  });

});
