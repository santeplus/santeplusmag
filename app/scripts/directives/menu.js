'use strict';

/**
 * @ngdoc directive
 * @name santeplusApp.directive:menu
 * @description
 * # menu
 */
angular.module('santeplusApp')
  .directive('menu', function () {
    return {
      templateUrl: 'views/menu.html',
      restrict: 'E',
      replace: true,
      controller: ['$scope', function($scope) {

      }]
    };
  });

