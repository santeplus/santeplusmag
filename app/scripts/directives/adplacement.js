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
