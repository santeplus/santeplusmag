'use strict';

/**
 * @ngdoc directive
 * @name santeplusApp.directive:adPlacement
 * @description
 * # adPlacement
 */
angular.module('santeplusApp')
  .directive('adPlacement', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      replace: true,
      scope : {
      	  containerId: '@',
          adClient : '@',
          adSlot : '@',
          inlineStyle : '@',
          adFormat : '@'
      },
      link: function postLink(scope, element, attrs) {
      	console.log("#" + scope.containerId);
      	console.log($("#" + scope.containerId));
      }
    };
  });
