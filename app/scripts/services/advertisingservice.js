'use strict';

/**
 * @ngdoc service
 * @name santeplusApp.advertisingService
 * @description
 * # advertisingService
 * Service in the santeplusApp.
 */
angular.module('santeplusApp')
  .service('advertisingService', function () {
  		this.injectADX = function(html, position, adSlot)
  		{
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
  				var nParagraph = 0;
  				if(position == "start")
  					nParagraph = 0;
  				else if(position == "end")
  					nParagraph = elem.find("p:not(:empty)").length - 2;
  				else if(position == "center")
  					nParagraph = parseInt( elem.find("p:not(:empty)").length / 2 );
  				$(ad_html).insertAfter(elem.find("p:not(:empty)").eq(nParagraph));
  			}

  			return elem.html();
  			
  		}
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
