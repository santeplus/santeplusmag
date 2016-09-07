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
                    console.log(data);
                    _.each(data.items, function(elem){
                        elem.slug = elem.url.substring(elem.url.indexOf(".com/") + 5, elem.url.length - 1)
                    });
                    $scope.menu = data;
                });
            },
            restrict: 'E',
            templateUrl: 'views/menu.html',
            link: function postLink(scope, element, attrs) {
                $('.nav').on('click', function(){
                    $('.btn-navbar').click(); //bootstrap 2.x
                    $('.navbar-toggle').click() //bootstrap 3.x by Richard
                });
            }
        };
    });

$(document).click(function (event) {
    var clickover = $(event.target);
    var _opened = $(".navbar-collapse").hasClass("collapse in");
    if (_opened === true && !clickover.hasClass("navbar-toggle")) {
        $("button.navbar-toggle").click();
    }
});