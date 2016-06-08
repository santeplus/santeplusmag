'use strict';

/**
 * @ngdoc function
 * @name santeplusApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the santeplusApp
 */
angular.module('santeplusApp')
  .controller('MenuCtrl', function ($routeParams, $scope, menuService) {
    if(menuService.getElements())
    {
    	$scope.currentElements = menuService.injectAdverts(menuService.getElements());
   	}
  	else
  	{
  		menuService.getMenuElements().then(function( elems ) {
            $scope.currentElement = menuService.injectAdverts(elems);
        });
  	}
    
  });
