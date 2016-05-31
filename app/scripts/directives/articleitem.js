'use strict';

/**
 * @ngdoc directive
 * @name santeplusApp.directive:articleItem
 * @description
 * # articleItem
 */
angular.module('santeplusApp')
  .directive('articleItem', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the articleItem directive');
      }
    };
  });
