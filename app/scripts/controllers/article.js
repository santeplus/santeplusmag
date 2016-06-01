'use strict';

/**
 * @ngdoc function
 * @name santeplusApp.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the santeplusApp
 */
angular.module('santeplusApp')
  .controller('ArticleCtrl', function ($routeParams, $scope, articleService		) {
    var articleId = $routeParams.id;
    if(articleService.getArticle(articleId))
    {
    	$scope.currentArticle = articleService.getArticle(articleId);
    }
  	else
  	{
  		articleService.getArticleById(articleId).then(function( article ) {
            $scope.currentArticle = article;
        });
  	}
  });
