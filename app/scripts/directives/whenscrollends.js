'use strict';

/**
 * @ngdoc directive
 * @name santeplusApp.directive:whenScrollEnds
 * @description
 * # whenScrollEnds
 */
angular.module('santeplusApp')
  .directive('whenScrollEnds', function () {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {

        	var deviceAgent = navigator.userAgent.toLowerCase();
  			var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
	
  			// on déclence une fonction lorsque l'utilisateur utilise sa molette 
		  	$(window).scroll(function() {		
		  	  // cette condition vaut true lorsque le visiteur atteint le bas de page
		  	  // si c'est un iDevice, l'évènement est déclenché 150px avant le bas de page
		  	  if(($(window).scrollTop() + $(window).height()) == $(document).height()
		  	  || agentID && ($(window).scrollTop() + $(window).height()) + 150 > $(document).height()) {
		  	    // on effectue nos traitements
		  	    scope.$apply(attrs.whenScrollEnds);
		  	  }
		  	});
        }
    };
  });