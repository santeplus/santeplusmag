'use strict';

/**
 * @ngdoc overview
 * @name santeplusApp
 * @description
 * # santeplusApp
 *
 * Main module of the application.
 */
 
//commit
angular
    .module('santeplusApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'rt.encodeuri',
        'angular-inview',
        'angulartics',
        'angulartics.google.analytics',
        'seo'
    ])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
              templateUrl: 'views/main.html',
              controller: 'MainCtrl',
              controllerAs: 'main'
            })
            .when('/about', {
              templateUrl: 'views/about.html',
              controller: 'AboutCtrl',
              controllerAs: 'about'
            })
            .when('/categorie/:slug', {
              templateUrl: 'views/main.html',
              controller: 'CategorieCtrl',
              controllerAs: 'categorie'
            })
            .when('/:id/', {
              templateUrl: 'views/article.html',
              controller: 'ArticleCtrl',
              controllerAs: 'article'
            })
            .otherwise({
              redirectTo: '/'
            });
    }).config( [
        '$compileProvider',
        function( $compileProvider )
        {   
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|whatsapp|sms):/);
            // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
        }
    ])
    .config(['$locationProvider', function($location) {
      $location.hashPrefix('!');
    }]);


