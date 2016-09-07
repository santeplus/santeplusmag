'use strict';

/**
 * @ngdoc directive
 * @name santeplusApp.directive:whenScrollEnds
 * @description
 * # whenScrollEnds
 */
angular.module('santeplusApp')
  .directive('whenScrollEnds', function ($timeout) {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {

        	var deviceAgent = navigator.userAgent.toLowerCase();
  			var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
			var delay = 150;
			var timeout = null;
  			// on déclence une fonction lorsque l'utilisateur utilise sa molette 
		  	$(window).scroll(function() {
		  		clearTimeout(timeout);
		    	timeout = setTimeout(function(){
		    	    if(($(window).scrollTop() + $(window).height()) == $(document).height()
				  	  || agentID && ($(window).scrollTop() + $(window).height()) + 150 > $(document).height()) {
				  	    // on effectue nos traitements
				  			scope.$apply(attrs.whenScrollEnds);						  
				  	}
		    	},delay);
		  	});
        }
    };
  });