'use strict';

/**
 * @ngdoc function
 * @name santeplusApp.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the santeplusApp
 */
angular.module('santeplusApp')
.controller('ArticleCtrl', function ($analytics, $routeParams, $scope, articleService, advertisingService, $location, $timeout, $anchorScroll) {
    advertisingService.refreshDfp();
    var articleId = $routeParams.id;
    if(articleService.getArticle(articleId))
    {
    	$scope.currentArticle = articleService.getArticle(articleId);
        $timeout(injectAds_ADX, 200);
   	}
  	else
  	{
        $scope.loading = true;
  		articleService.getArticleBySlug(articleId).then(function( article ) {
            $scope.currentArticle = article[0];
            $timeout(injectAds_ADX, 200);
            $scope.htmlReady();
            $scope.loading = false;
        });
  	}


    $scope.isVisible = true;
    $scope.hideFooter = function(inview)
    {
        $scope.isVisible = inview; 
    };

    articleService.getArticles().then(function( articles ) {
        articleService.populateArticles(articles);
        $scope.articles = articleService.getCurrentArticles();
    });

    articleService.getPopularArticles().then(function( articles ) {
        $scope.topArticles = articles;
    });

    $scope.readMore = function()
    {
        $('html, body').animate({
          scrollTop: document.body.scrollTop + window.innerHeight - 55
        }, 1000);
        $scope.showHome = true;
    }

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
                    nextArticleId = $scope.articles[i+1].slug;
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

    function openArticle(slug)
    {
        $location.path('/' + slug + '/' );
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