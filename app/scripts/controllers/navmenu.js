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
    //var elements = $routeParams.id;
    if(menuService.setElements(elems))
    {
    	$scope.setElements = menuService.injectAdverts(menuService.getElements(elems));
   	}
  	else
  	{
  		menuService.setElements().then(function( elems ) {
            $scope.setElements = menuService.injectAdverts(elems);
        });
  	}
  });
