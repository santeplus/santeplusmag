'use strict';

describe('Directive: whenScrollEnds', function () {

  // load the directive's module
  beforeEach(module('santeplusApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<when-scroll-ends></when-scroll-ends>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the whenScrollEnds directive');
  }));
});
