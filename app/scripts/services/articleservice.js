'use strict';

/**
 * @ngdoc service
 * @name santeplusApp.articleService
 * @description
 * # articleService
 * Service in the santeplusApp.
 */
angular.module('santeplusApp')
    .service('articleService', function ($http, $q, advertisingService ) {
    	var currentArticles = [];
        var currentPage = 1;
    	this.getArticles = function() {
    	    var request = $http({
    	        method: "get",
    	        url: "http://www.santeplusmag.com/wp-json/wp/v2/posts?per_page=3&page=" + currentPage,
    	        params: {
    	            action: "get"
    	        }
    	    });
            currentPage ++;
    	    return( request.then( handleSuccess, handleError ) );
    	}

        this.getCurrentArticles = function() {
            return currentArticles;
        }

        // From Current Object
    	this.getArticle = function(id)
    	{
    		return _.findWhere(currentArticles, {'id': parseInt(id)});
    	}

        // From WebService
        this.getArticleById = function(id)
        {
            var request = $http({
                method: "get",
                url: "http://www.santeplusmag.com/wp-json/wp/v2/posts/" + id,
                params: {
                    action: "get"
                }
            });
            return( request.then( handleSuccess, handleError ) );
        }

    	this.populateArticles = function(articles)
    	{
    		currentArticles = currentArticles.concat(articles);
    	}

    	this.getCurrentArticles = function()
    	{
    		return currentArticles;
    	}

        this.injectAdverts = function(article)
        {
            article.content.rendered = advertisingService.injectADX(article.content.rendered, "start", "1234");
            article.content.rendered = advertisingService.injectADX(article.content.rendered, "end", "1235");
            article.content.rendered = advertisingService.injectADX(article.content.rendered, "center", "1236");
            return article;
        }

        function getLastParagraphNumber(html)
        {

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