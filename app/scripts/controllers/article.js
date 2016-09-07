'use strict';

/**
 * @ngdoc function
 * @name santeplusApp.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the santeplusApp
 */
angular.module('santeplusApp')
.controller('ArticleCtrl', function ($analytics, $routeParams, $scope, articleService, advertisingService, $location, $timeout) {
    advertisingService.refreshDfp();
    var articleId = $routeParams.id;
    if(articleService.getArticle(articleId))
    {
    	$scope.currentArticle = articleService.getArticle(articleId);
        $timeout(injectAds, 1000);
   	}
  	else
  	{
        $scope.loading = true;
  		articleService.getArticleBySlug(articleId).then(function( article ) {
            $scope.currentArticle = article[0];
            $timeout(injectAds, 1000);
            $scope.htmlReady();
            $scope.loading = false;
        });
  	}


    $scope.isVisible = true;
    $scope.hideFooter = function(inview)
    {
        $scope.isVisible = inview; 
    };
    /*
    if(articleService.getCurrentArticles().length)
    {
        $scope.articles = articleService.getCurrentArticles();
        //advertisingService.refreshDfp();
    }
    else
    {
    */
        articleService.getArticles().then(function( articles ) {
            articleService.populateArticles(articles);
            $scope.articles = articleService.getCurrentArticles();
        });
    /*
    }
    */

    // Check if the article is accessed directly from the link
    

    $scope.loadMore = function(callback)
    {
        callback = callback || null;
        articleService.getArticles().then(function( articles ) {
            articleService.populateArticles(articles);
            $scope.articles = articleService.getCurrentArticles();
            if(callback !== null )
            {
                callback(articles[0]);
            }
            advertisingService.refreshDfp();
        });
    };

    $scope.nextArticle = function()
    {
        var nextArticleId = 0;
        for (var i = 0; i < $scope.articles.length; i++) {
            if($scope.articles[i].id == $scope.currentArticle.id)
            {
                if(i != $scope.articles.length - 1)
                {
                    nextArticleId = $scope.articles[i+1].id;
                    openArticle(nextArticleId);
                }
                else
                {
                    $scope.loadMore(openArticle);
                }
            }
        }
    }

    $scope.homePageOpened = false;
    $scope.homePage = function()
    {   
        if(!$scope.homePageOpened && $scope.currentArticle)
        {
            $analytics.pageTrack('/');
            $scope.homePageOpened = true;
        }
    }

    function openArticle(id)
    {
        $location.path('/article/' + id );
    }

    function loadNextArticles()
    {
        var nextArticleId = 0;
        for (var i = 0; i < $scope.articles.length; i++) {
            if($scope.articles[i].id == $scope.currentArticle.id)
            {
                if(i != $scope.articles.length - 1)
                    nextArticleId = $scope.articles[i+1].id;
                else
                    $scope.loadMore();
            }
        }
    }
});