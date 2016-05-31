'use strict';

/**
 * @ngdoc service
 * @name santeplusApp.articleService
 * @description
 * # articleService
 * Service in the santeplusApp.
 */
angular.module('santeplusApp')
    .service('articleService', function ($http, $q ) {
                // Return public API.
    	return({
    	    getArticles: getArticles
    	});

    	function getArticles() {
    	    var request = $http({
    	        method: "get",
    	        url: "http://sante.santeplusmag.fr/wp-json/wp/v2/posts?per_page=4",
    	        params: {
    	            action: "get"
    	        }
    	    });
    	    return( request.then( handleSuccess, handleError ) );
    	}

    	// ---
        // PRIVATE METHODS.
        // ---
        // I transform the error response, unwrapping the application dta from
        // the API response payload.
        function handleError( response ) {
            // The API response from the server should be returned in a
            // nomralized format. However, if the request was not handled by the
            // server (or what not handles properly - ex. server error), then we
            // may have to normalize it on our end, as best we can.
            if (
                ! angular.isObject( response.data ) ||
                ! response.data.message
                ) {
                return( $q.reject( "An unknown error occurred." ) );
            }
            // Otherwise, use expected error message.
            return( $q.reject( response.data.message ) );
        }
        // I transform the successful response, unwrapping the application data
        // from the API response payload.
        function handleSuccess( response ) {
            return( response.data );
        }

  	});