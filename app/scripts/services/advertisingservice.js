'use strict';

/**
 * @ngdoc service
 * @name santeplusApp.advertisingService
 * @description
 * # advertisingService
 * Service in the santeplusApp.
 */
angular.module('santeplusApp')
  .service('advertisingService', function ($timeout) {
        this.refreshDfp = function()
        {
            
            $timeout(function(){
                if($(".adunit:not(.display-block)"))
                {
                    $(".adunit:not(.display-block)").dfp({
                        'dfpID' : "14727465",
                        'sizeMapping' : {
                            'my-default': [
                                {browser: [ 1600, 320], ad_sizes: [[300, 250], [336,280], [320,50]]},
                                {browser: [ 320, 300], ad_sizes: [[300, 250], [320,50]]},
                                {browser: [   0,   300], ad_sizes: [300, 250]}
                            ]
                        },
                        afterEachAdLoaded: function (adUnit) {
                            console.log($(adUnit).attr("id"));
                            passbackAdx(adUnit);
                        }
                    });
                }
                    
                //$(".adunit:not(.display-block)").dfp("14727465");
            }, 50);
        }
      this.injectADX = function(html, position, adSlot)
      {
            console.log(html);
            console.log(adSlot);
        var adx_html = "<img data-ad-slot='"+ adSlot +"'' src='http://www.hamovhotov.com/advertisement/wp-content/uploads/2007/03/300x250ad.gif' />";
        var ad_html = "<div class='mobile_ads'>" + adx_html + "</div>";
        var elem = $("<div><div>");
        elem.html(html);
        // If the ad slots exists
        if(elem.find("[data-ad-slot='" + adSlot + "']").length )
        {
          var parent = elem.find("[data-ad-slot='" + adSlot + "']").parent();
          parent.html("");
          parent.html(adx_html);
        }
        else
        {
                $.expr[':'].textEquals = $.expr.createPseudo(function(arg) {
                    return function( elem ) {
                        return $(elem).text().match("^" + arg + "$");
                    };
                });
                var typical_height = window.innerHeight - 105;
                var elements_all = elem.find("p:not(:empty):not(:textEquals('\\n')), li, h2, h3, h4");
                var current_y = 0;
            for (var i = 0; i < elements_all.length; i++) {
                    current_y += getHeight(elements_all[i]);
                    if(current_y >= typical_height)
                    {
                        $(ad_html).insertAfter(elements_all[i]);
                        current_y = 0;
                    }                    
                }
                /*
                var nParagraph = 0;
          if(position == "start")
            nParagraph = 0;
          else if(position == "end")
            nParagraph = elem.find("p:not(:empty):not(:textEquals('\\n')), ul, ol").length - 2;
          else if(position == "center")
            nParagraph = parseInt( elem.find("p:not(:empty):not(:textEquals('\\n')), ul, ol").length / 2 );
          $(ad_html).insertAfter(elem.find("p:not(:empty):not(:textEquals('\\n')), ul, ol").eq(nParagraph));
            */
            }

        return elem.html();
        
      }
    // AngularJS will instantiate a singleton by calling "new" on this function
});

function getHeight(elm) {
    var elmHeight, elmMargin
    if(document.all) {// IE
        elmHeight = elm.currentStyle.height;
        elmMargin = parseInt(elm.currentStyle.marginTop, 10) + parseInt(elm.currentStyle.marginBottom, 10) + "px";
    } else {// Mozilla
        elmHeight = document.defaultView.getComputedStyle(elm, '').getPropertyValue('height');
        elmMargin = parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-top')) + parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-bottom')) + "px";
    }
    return (parseInt(elmHeight) + parseInt(elmMargin));
}

function passbackAdx(adUnit)
{
    // Do something after each ad is loaded.
    if ($(adUnit).hasClass('display-none')) {
        if( ! $(adUnit).find("ins").length)
        {
            $(adUnit).html('<ins class="adsbygoogle" style="display:inline-block;width:300px;height:250px" data-ad-client="ca-pub-5343163216163772" data-ad-slot="9007008442"></ins>');
            $(adUnit).addClass('display-block');
            $(adUnit).css({ display: 'block' });
            (adsbygoogle = window.adsbygoogle || []).push({});
            $(adUnit).removeClass('display-none'); 
        }
    }
}

/*
function injectAds_ADX()
{
    var width = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
    var dimensions;
    if(width >= 336)
        dimensions = "width:336px;height:280px";
    else
        dimensions = "width:300px;height:250px";
    var elem = $("#content");
    var adSlot = "1111";

    
        $.expr[':'].textEquals = $.expr.createPseudo(function(arg) {
            return function( elem ) {
                return $(elem).text().match("^" + arg + "$");
            };
        });
        
        var ids = [ 2368942162,3845650042,5322357922,6799065802,9752481562,8275773682,2229189442,3705897322,5182605202];
        var element_excerpt = elem.find("h2");
        $('<div class="mobile_ads"><ins class="adsbygoogle" style="display:inline-block;' + dimensions + '" data-ad-client="ca-pub-5343163216163772" data-ad-slot="' + ids[0] + '"></ins></div>').insertAfter(element_excerpt);
        (adsbygoogle = window.adsbygoogle || []).push({});
        var typical_height = window.innerHeight * 1.25 - 105;
        var elements_all = elem.find("p:not(:empty):not(:textEquals('\\n')), li, h3, h4");
        var current_y = 0;
        
        var adx_id = 1;
        for (var i = 0; i < elements_all.length; i++) {
            current_y += getHeight(elements_all[i]);
            if(current_y >= typical_height)
            {
                $('<div class="mobile_ads"><ins class="adsbygoogle" style="display:inline-block;' + dimensions + '" data-ad-client="ca-pub-5343163216163772" data-ad-slot="' + ids[adx_id] + '"></ins></div>').insertAfter(elements_all[i]);
                (adsbygoogle = window.adsbygoogle || []).push({});
                current_y = 0;
                adx_id++;
            }                    
        }
    
}
*/
/*
function injectAds()
{
    var width = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
    var dimensions;
    if(width >= 336)
        dimensions = "300x250,336x280";
    else
        dimensions = "300x250";
    var elem = $("#content");
    var adSlot = "1111";

    var ad_html = '<div class="in_article mobile_ads adunit" collapseEmptyDivs="true" data-adunit="NEW_MOBILE_IN_ARTICLE_1" data-dimensions="' + dimensions +'"></div>';
    // If the ad slots exists
    if(elem.find("[data-ad-slot='" + adSlot + "']").length )
    {
        var parent = elem.find("[data-ad-slot='" + adSlot + "']").parent();
        parent.html("");
        parent.html(adx_html);
    }
    else
    {
        $.expr[':'].textEquals = $.expr.createPseudo(function(arg) {
            return function( elem ) {
                return $(elem).text().match("^" + arg + "$");
            };
        });
        
        var element_excerpt = elem.find("h2");
        $(ad_html).insertAfter(element_excerpt);
        
        var typical_height = window.innerHeight * 1.25 - 105;
        var elements_all = elem.find("p:not(:empty):not(:textEquals('\\n')), li, h3, h4");
        var current_y = 0;
        var dfp_id = 2;
        for (var i = 0; i < elements_all.length; i++) {
            current_y += getHeight(elements_all[i]);
            if(current_y >= typical_height)
            {
                ad_html = '<div class="in_article mobile_ads adunit" collapseEmptyDivs="true" data-adunit="NEW_MOBILE_IN_ARTICLE_' + dfp_id + '" data-dimensions="' + dimensions +'"></div>';
                console.log(ad_html);
                $(ad_html).insertAfter(elements_all[i]);
                current_y = 0;
                dfp_id++;
            }                    
        }
    }

    if($(".in_article.adunit:not(.display-block)"))
        $(".in_article.adunit:not(.display-block)").dfp({
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
}
*/


function injectAds()
{
    var width = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
    var dimensions;
    if(width >= 336)
        dimensions = "300x250,336x280";
    else
        dimensions = "300x250";
    var elem = $("#content");
    var adSlot = "1111";

    var ad_html = '<div class="in_article mobile_ads adunit" collapseEmptyDivs="true" data-adunit="NEW_MOBILE_IN_ARTICLE_1" data-dimensions="' + dimensions +'"></div>';
    // If the ad slots exists
    if(elem.find("[data-ad-slot='" + adSlot + "']").length )
    {
        var parent = elem.find("[data-ad-slot='" + adSlot + "']").parent();
        parent.html("");
        parent.html(adx_html);
    }
    else
    {
        $.expr[':'].textEquals = $.expr.createPseudo(function(arg) {
            return function( elem ) {
                return $(elem).text().match("^" + arg + "$");
            };
        });
        
        // Insert First Ad
        var element_excerpt = elem.find("h2");
        $(ad_html).insertAfter(element_excerpt);
        
        var elements_all = elem.find("p:not(:empty):not(:textEquals('\\n')), li, h3, h4");
        var current_y = 0;
        var dfp_id = 2;
        // get the height of all elements
        var article_height = 0;
        for (var i = 0; i < elements_all.length; i++) {
            article_height += getHeight(elements_all[i]);
        }
        // Insert Mid Ad
        for (var i = 0; i < elements_all.length; i++) {
            current_y += getHeight(elements_all[i]);
            if(current_y >= (article_height / 2 ))
            {
                ad_html = '<div class="in_article mobile_ads adunit" collapseEmptyDivs="true" data-adunit="NEW_MOBILE_IN_ARTICLE_' + dfp_id + '" data-dimensions="' + dimensions +'"></div>';
                $(ad_html).insertAfter(elements_all[i]);
                current_y = 0;
                dfp_id++;
                break;
            }                    
        }

        // Insert Last Ad
        ad_html = '<div class="in_article mobile_ads adunit" collapseEmptyDivs="true" data-adunit="NEW_MOBILE_IN_ARTICLE_' + dfp_id + '" data-dimensions="' + dimensions +'"></div>';
        $(ad_html).insertBefore(elements_all[elements_all.length - 1]);

    }

    if($(".in_article.adunit:not(.display-block)"))
        $(".in_article.adunit:not(.display-block)").dfp({
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
}