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
      templateUrl: 'views/article-item.html',
      restrict: 'E',
      replace: true,
      controller: ['$scope', function($scope) {

      }]
    };
  });
