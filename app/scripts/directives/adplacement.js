'use strict';

/**
 * @ngdoc directive
 * @name santeplusApp.directive:adPlacement
 * @description
 * # adPlacement
 */
angular.module('santeplusApp')
    .directive('adPlacementTaboola', function () {
        return {
            template: '<div id="taboola_article"><div id="taboola-below-article-thumbnails-2nd"></div></div>',
            restrict: 'E',
            replace: true,
            scope : {
            	containerId: '@',
                adClient : '@',
                adSlot : '@',
                inlineStyle : '@',
                adFormat : '@'
            },
            link: function postLink(scope, element, attrs) {
                window._taboola = window._taboola || [];
                _taboola.push({article:'auto'});
                !function (e, f, u) {
                  e.async = 1;
                  e.src = u;
                  f.parentNode.insertBefore(e, f);
                }(document.createElement('script'),
                document.getElementsByTagName('script')[0],
                '//cdn.taboola.com/libtrc/santeplusmag/loader.js');

                
                window._taboola = window._taboola || [];
                _taboola.push({
                    mode: 'thumbnails-rr',
                    container: 'taboola-below-article-thumbnails-2nd',
                    placement: 'Below Article Thumbnails 2nd',
                    target_type: 'mix'
                });
            }
        };
})
.directive('adPlacementLigatus', function () {
    return {
        template: '<div id="ligatus_article"><div id="lig_santeplusmag_smartbox"></div></div>',
        restrict: 'E',
        replace: true,
        scope : {

        },
        link: function postLink(scope, element, attrs) {
            $('body').append('<script language="javascript" src="http://i.ligatus.com/angular_front/tags/fr/santeplusmag/1.5/tags/angular-tag.js"></script>');
        }
    };
})
.directive('adPlacementAdx', function ($timeout) {
    return {
        template: '<div class="mobile_ads"><ins class="adsbygoogle" data-ad-client="{{adClient}}" data-ad-slot="{{adSlot}}" style="{{adStyle}}"></ins></div>',
        restrict: 'E',
        replace: true,
        scope : {
            adClient : '@',
            adSlot : '@',
            adStyle : '@'
        },
        link: function postLink(scope, element, attrs) {
            $timeout(function () {
                (adsbygoogle = window.adsbygoogle || []).push({});
            }, 1);
        }
    };
}).directive('adPlacementDfp', function ($timeout) {
    return {
        template: '<div class="mobile_ads adunit" data-targeting="{{adunitTargeting}}" collapseEmptyDivs="true" data-adunit="{{adunitCode}}" data-dimensions="{{adunitDimensions}}" data-size-mapping="my-default"></div>',
        restrict: 'E',
        replace: true,
        terminal: true,
        transclude: false,
        scope : {
            adunitCode : '@',
            adunitDimensions : '@',
            adunitTargeting : '@'
        },
        controller:function($timeout){
            
        },
        link: function(scope,element,attrs) {
            if($(element).attr("data-adunit") == "NEW_SPM_HEADR")
            {
                $timeout(function () {
                    $(element).dfp({
                        'dfpID' : "14727465",
                        'sizeMapping' : {
                            'my-default': [
                                {browser: [ 1600, 320], ad_sizes: [[300, 250], [336,280], [320,50]]},
                                {browser: [ 320, 300], ad_sizes: [[300, 250], [320,50]]},
                                {browser: [   0,   300], ad_sizes: [300, 250]}
                            ]
                        },
                        afterEachAdLoaded: function (adUnit) {
                            passbackAdx(adUnit);
                        }
                    });
                });
            }
            
        }
    };
});
