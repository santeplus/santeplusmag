'use strict';

describe('Service: articleService', function () {

  // load the service's module
  beforeEach(module('santeplusApp'));

  // instantiate service
  var articleService;
  beforeEach(inject(function (_articleService_) {
    articleService = _articleService_;
  }));

  it('should do something', function () {
    expect(!!articleService).toBe(true);
  });

});
