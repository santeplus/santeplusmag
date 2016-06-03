'use strict';

/**
 * @ngdoc filter
 * @name santeplusApp.filter:filters
 * @function
 * @description
 * # filters
 * Filter in the santeplusApp.
 */
 angular.module('santeplusApp')
    .filter('trusted', function($sce){
        return function(html){
            return $sce.trustAsHtml(html)
        }
     });
