'use strict';

/**
 * @ngdoc function
 * @name santeplusApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the santeplusApp
 */
angular.module('santeplusApp')
  	.controller('MainCtrl', function ($scope, articleService, advertisingService, $timeout) {
    	if(articleService.getCurrentArticles().length == 0 )
        {
            articleService.init();
            
            $scope.loading = true;
            articleService.getArticles().then(function( articles ) {
                articleService.populateArticles(articles);
                $scope.articles = articleService.getCurrentArticles();
                advertisingService.refreshDfp();
                $scope.loading = false;
            });
        }
        else
        {
            $scope.articles = articleService.getCurrentArticles();
            advertisingService.refreshDfp();
        }      

        $scope.loadMore = function()
        {
            $scope.loading = true;
            articleService.getArticles().then(function( articles ) {
                articleService.populateArticles(articles);
                $scope.articles = articleService.getCurrentArticles();
                advertisingService.refreshDfp();
                $scope.loading = false;
            });            
        };

        $scope.currentArticle = { id: 0};
});


