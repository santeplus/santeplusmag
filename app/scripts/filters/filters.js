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
    })
    .filter('without', function(){
        return function(data, id){
            return _.reject(data, function(obj){ return obj.id == id; });
        }
    })
    .filter('getImage', function(){
        return function(article){
            if(article === undefined)
                return null;
            var width = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
            if(width >= 667)
            {
                console.log("tab");
                return article.featured_image_thumbnail_tab_url;
            }
            else
            {
                console.log("mobile");
                return article.featured_image_thumbnail_url;
            }
        }
    });