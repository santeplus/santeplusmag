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
            controller: function ($scope, $http) {
                $http.get('http://www.santeplusmag.com/wp-json/wp-api-menus/v2/menus/46')

                .success(function (data) {
                    $scope.menu = data;        
                });

            },
            restrict: 'E',
            templateUrl: 'views/menu.html'
        };
    });