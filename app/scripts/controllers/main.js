'use strict';

/**
 * @ngdoc function
 * @name santeplusApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the santeplusApp
 */
angular.module('santeplusApp')
  	.controller('MainCtrl', function ($scope, articleService) {
    	this.awesomeThings = [
      		'HTML5 Boilerplate',
      		'AngularJS',
      		'Karma'
    	];

    	articleService.getArticles().then(function( articles ) {
            $scope.articles = articles;
        });
    	



	});
