'use strict';

/**
 * @ngdoc function
 * @name santeplusApp.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the santeplusApp
 */
angular.module('santeplusApp')
.controller('ArticleCtrl', function ($routeParams, $scope, articleService, advertisingService) {
    var articleId = $routeParams.id;
    if(articleService.getArticle(articleId))
    {
    	$scope.currentArticle = articleService.injectAdverts(articleService.getArticle(articleId));
   	}
  	else
  	{
  		articleService.getArticleById(articleId).then(function( article ) {
            $scope.currentArticle = articleService.injectAdverts(article);
        });
  	}
})
.controller('PopularArticlesCtrl', function ($routeParams, $scope, articleService, advertisingService) {
    articleService.init();
    articleService.getPopularArticles().then(function( articles ) {
        articleService.populateArticles(articles);
        $scope.articles = articleService.getCurrentArticles();
    });

    $scope.loadMore = function()
    {
        articleService.getPopularArticles().then(function( articles ) {
            articleService.populateArticles(articles);
            $scope.articles = articleService.getCurrentArticles();
        });
    };
});