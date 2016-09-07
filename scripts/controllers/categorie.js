'use strict';

/**
 * @ngdoc function
 * @name santeplusApp.controller:CategorieCtrl
 * @description
 * # CategorieCtrl
 * Controller of the santeplusApp
 */
angular.module('santeplusApp')
  	.controller('CategorieCtrl', function ($scope, $routeParams, articleService, advertisingService) {
  		var categorie = $routeParams.slug;
  		articleService.init();
    	articleService.getArticlesByCategory(categorie).then(function( articles ) {
            articleService.populateArticles(articles);
            $scope.articles = articleService.getCurrentArticles();
            advertisingService.refreshDfp();
        });


        $scope.loadMore = function()
        {
            articleService.getArticlesByCategory(categorie).then(function( articles ) {
                articleService.populateArticles(articles);
                $scope.articles = articleService.getCurrentArticles();
                advertisingService.refreshDfp();
            });
        };

        $scope.currentArticle = { id: 0};
});