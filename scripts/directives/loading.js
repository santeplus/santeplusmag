'use strict';

/**
 * @ngdoc directive
 * @name santeplusApp.directive:loading
 * @description
 * # loading
 */

angular.module('santeplusApp')
.directive('ngLoading', function () {
        return {
            controller: function ($scope, $http) {
                
            },
            restrict: 'E',
            templateUrl: 'views/loading.html'
        };
    });