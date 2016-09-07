'use strict';

/**
 * @ngdoc service
 * @name santeplusApp.pageService
 * @description
 * # pageService
 * Service in the santeplusApp.
 */
 console.log("getTitle");
angular.module('santeplusApp')
    .service('pageService', function ($http, $q ) {
        var title = 'Santé+ Magazine - Le magazine de la santé naturelle';
        this.getTitle = function() {
            return title;
        }

        this.setTitle = function(newTitle)
        {
            this.title = newTitle;
        }
  	});