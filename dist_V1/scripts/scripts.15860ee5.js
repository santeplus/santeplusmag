"use strict";function getHeight(a){var b,c;return document.all?(b=a.currentStyle.height,c=parseInt(a.currentStyle.marginTop,10)+parseInt(a.currentStyle.marginBottom,10)+"px"):(b=document.defaultView.getComputedStyle(a,"").getPropertyValue("height"),c=parseInt(document.defaultView.getComputedStyle(a,"").getPropertyValue("margin-top"))+parseInt(document.defaultView.getComputedStyle(a,"").getPropertyValue("margin-bottom"))+"px"),parseInt(b)+parseInt(c)}function passbackAdx(a){$(a).hasClass("display-none")?(console.log("Ad not found"),$(a).find("ins").length||($(a).html('<ins class="adsbygoogle" style="display:inline-block;width:300px;height:250px" data-ad-client="ca-pub-5343163216163772" data-ad-slot="6514814242"></ins>'),$(a).removeClass("display-none"),$(a).addClass("display-block"),$(a).css({display:"block"}),(adsbygoogle=window.adsbygoogle||[]).push({}),console.log("ADX Injected in "+$(a).attr("id")))):console.log("Ad found")}function injectAds(){var a,b=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;a=b>=336?"300x250,336x280":"300x250";var c=$("#content"),d="1111",e='<div class="mobile_ads adunit" collapseEmptyDivs="true" data-adunit="NEW_MOBILE_IN_ARTICLE" data-dimensions="'+a+'"></div>';if(c.find("[data-ad-slot='"+d+"']").length){var f=c.find("[data-ad-slot='"+d+"']").parent();f.html(""),f.html(adx_html)}else{$.expr[":"].textEquals=$.expr.createPseudo(function(a){return function(b){return $(b).text().match("^"+a+"$")}});for(var g=1.25*window.innerHeight-105,h=c.find("p:not(:empty):not(:textEquals('\\n')), li, h3, h4"),i=0,j=0;j<h.length;j++)i+=getHeight(h[j]),i>=g&&($(e).insertBefore(h[j]),i=0)}$(".adunit:not(.display-block)")&&$(".adunit:not(.display-block)").dfp({dfpID:"14727465",afterEachAdLoaded:function(a){passbackAdx(a)}})}angular.module("santeplusApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","rt.encodeuri","angular-inview","angulartics","angulartics.google.analytics","seo"]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/categorie/:slug",{templateUrl:"views/main.html",controller:"CategorieCtrl",controllerAs:"categorie"}).when("/:id",{templateUrl:"views/article.html",controller:"ArticleCtrl",controllerAs:"article"}).otherwise({redirectTo:"/"})}]).config(["$compileProvider",function(a){a.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|whatsapp|sms):/)}]).config(["$locationProvider",function(a){a.hashPrefix("!")}]),angular.module("santeplusApp").controller("MainCtrl",["$scope","articleService","advertisingService","$timeout",function(a,b,c,d){console.log(b.getCurrentArticles()),0==b.getCurrentArticles().length?(b.init(),b.getArticles().then(function(d){b.populateArticles(d),a.articles=b.getCurrentArticles(),c.refreshDfp()})):(a.articles=b.getCurrentArticles(),c.refreshDfp()),a.loadMore=function(){b.getArticles().then(function(d){b.populateArticles(d),a.articles=b.getCurrentArticles(),c.refreshDfp()})},a.currentArticle={id:0}}]),angular.module("santeplusApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("santeplusApp").directive("articleItem",function(){return{templateUrl:"views/article-item.html",restrict:"E",replace:!0,controller:["$scope",function(a){}]}}),angular.module("santeplusApp").service("articleService",["$http","$q","advertisingService",function(a,b,c){function d(a){return angular.isObject(a.data)&&a.data.message?b.reject(a.data.message):b.reject("An unknown error occurred.")}function e(a){return a.data}var f=[],g=1;this.init=function(){f=[],g=1},this.getArticles=function(){var b=a({method:"get",url:"http://www.santeplusmag.com/wp-json/wp/v2/posts?per_page=3&page="+g,params:{action:"get"}});return g++,b.then(e,d)},this.getArticlesByCategory=function(b){var c=a({method:"get",url:"http://www.santeplusmag.com/wp-json/wp/v2/posts?per_page=3&page="+g+"&filter[category_name]="+b,params:{action:"get"}});return g++,c.then(e,d)},this.getPopularArticles=function(){var b=a({method:"get",url:"http://www.santeplusmag.com/wp-json/wp/v2/popular_posts?per_page=3&page="+g,params:{action:"get"}});return g++,b.then(e,d)},this.getCurrentArticles=function(){return f},this.getArticle=function(a){return _.findWhere(f,{relative_permalink:a})},this.getArticleById=function(b){var c=a({method:"get",url:"http://www.santeplusmag.com/wp-json/wp/v2/posts/"+b,params:{action:"get"}});return c.then(e,d)},this.getArticleBySlug=function(b){var c=a({method:"get",url:"http://www.santeplusmag.com/wp-json/wp/v2/posts?filter[name]="+b,params:{action:"get"}});return c.then(e,d)},this.populateArticles=function(a){f=f.concat(a)},this.getCurrentArticles=function(){return f},this.injectAdverts=function(a){return a.content.rendered=c.injectADX(a.content.rendered,"start","1234"),a.content.rendered=c.injectADX(a.content.rendered,"end","1235"),a.content.rendered=c.injectADX(a.content.rendered,"center","1236"),a},this.getArticlesAfterDate=function(b){var c=a({method:"get",url:"http://www.santeplusmag.com/wp-json/wp/v2/posts?per_page=10&page=1&filter[date_query][after]="+b,params:{action:"get"}});return c.then(e,d)}}]),angular.module("santeplusApp").controller("ArticleCtrl",["$routeParams","$scope","articleService","advertisingService","$location","$timeout",function(a,b,c,d,e,f){function g(a){e.path("/article/"+a)}var h=a.id;c.getArticle(h)?(b.currentArticle=c.getArticle(h),f(injectAds,1e3)):c.getArticleBySlug(h).then(function(a){b.currentArticle=a[0],f(injectAds,1e3),b.htmlReady()}),d.refreshDfp(),b.isVisible=!0,b.hideFooter=function(a){console.log(a),b.isVisible=a},b.articles=c.getCurrentArticles(),b.loadMore=function(a){a=a||null,c.getArticles().then(function(e){c.populateArticles(e),b.articles=c.getCurrentArticles(),null!=a&&a(e[0]),d.refreshDfp()})},b.nextArticle=function(){for(var a=0,c=0;c<b.articles.length;c++)b.articles[c].id==b.currentArticle.id&&(c!=b.articles.length-1?(a=b.articles[c+1].id,g(a)):b.loadMore(g))}}]),angular.module("santeplusApp").directive("whenScrollEnds",["$timeout",function(a){return{restrict:"A",link:function(a,b,c){var d=navigator.userAgent.toLowerCase(),e=d.match(/(iphone|ipod|ipad)/),f=150,g=null;$(window).scroll(function(){clearTimeout(g),g=setTimeout(function(){($(window).scrollTop()+$(window).height()==$(document).height()||e&&$(window).scrollTop()+$(window).height()+150>$(document).height())&&a.$apply(c.whenScrollEnds)},f)})}}}]),angular.module("santeplusApp").directive("adPlacementTaboola",function(){return{template:'<div id="taboola_article"><div id="taboola-below-article-thumbnails-2nd"></div></div>',restrict:"E",replace:!0,scope:{containerId:"@",adClient:"@",adSlot:"@",inlineStyle:"@",adFormat:"@"},link:function(a,b,c){window._taboola=window._taboola||[],_taboola.push({article:"auto"}),!function(a,b,c){a.async=1,a.src=c,b.parentNode.insertBefore(a,b)}(document.createElement("script"),document.getElementsByTagName("script")[0],"//cdn.taboola.com/libtrc/santeplusmag/loader.js"),window._taboola=window._taboola||[],_taboola.push({mode:"thumbnails-rr",container:"taboola-below-article-thumbnails-2nd",placement:"Below Article Thumbnails 2nd",target_type:"mix"})}}}).directive("adPlacementLigatus",function(){return{template:'<div id="ligatus_article"><div id="lig_santeplusmag_smartbox"></div></div>',restrict:"E",replace:!0,scope:{},link:function(a,b,c){$("body").append('<script language="javascript" src="http://i.ligatus.com/angular_front/tags/fr/santeplusmag/1.5/tags/angular-tag.js"></script>')}}}).directive("adPlacementAdx",function(){return{template:'<div class="mobile_ads"><img class="adsbygoogle" data-ad-client="{{adClient}}" data-ad-slot="{{adSlot}}" style="{{inlineStyle}}" data-ad-format="{{adFormat}}" src="http://www.hamovhotov.com/advertisement/wp-content/uploads/2007/03/300x250ad.gif" /></div>',restrict:"E",replace:!0,scope:{adClient:"@",adSlot:"@",inlineStyle:"@",adFormat:"@"},link:function(a,b,c){}}}).directive("adPlacementDfp",["$timeout",function(a){return{template:'<div class="mobile_ads adunit" data-targeting="{{adunitTargeting}}" collapseEmptyDivs="true" data-adunit="{{adunitCode}}" data-dimensions="{{adunitDimensions}}"></div>',restrict:"E",replace:!0,terminal:!0,transclude:!1,scope:{adunitCode:"@",adunitDimensions:"@",adunitTargeting:"@"},controller:["$timeout",function(a){}]}}]),angular.module("santeplusApp").service("advertisingService",["$timeout",function(a){this.refreshDfp=function(){a(function(){$(".adunit:not(.display-block)")&&$(".adunit:not(.display-block)").dfp({dfpID:"14727465",afterEachAdLoaded:function(a){passbackAdx(a)}})},100)},this.injectADX=function(a,b,c){console.log(a),console.log(c);var d="<img data-ad-slot='"+c+"'' src='http://www.hamovhotov.com/advertisement/wp-content/uploads/2007/03/300x250ad.gif' />",e="<div class='mobile_ads'>"+d+"</div>",f=$("<div><div>");if(f.html(a),f.find("[data-ad-slot='"+c+"']").length){var g=f.find("[data-ad-slot='"+c+"']").parent();g.html(""),g.html(d)}else{$.expr[":"].textEquals=$.expr.createPseudo(function(a){return function(b){return $(b).text().match("^"+a+"$")}});for(var h=window.innerHeight-105,i=f.find("p:not(:empty):not(:textEquals('\\n')), li, h2, h3, h4"),j=0,k=0;k<i.length;k++)j+=getHeight(i[k]),j>=h&&($(e).insertAfter(i[k]),j=0)}return f.html()}}]),angular.module("santeplusApp").filter("trusted",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]).filter("without",function(){return function(a,b){return _.reject(a,function(a){return a.id==b})}}).filter("getImage",function(){return function(a){if(void 0===a)return null;var b=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;return b>=667?(console.log("tab"),a.featured_image_thumbnail_tab_url):(console.log("mobile"),a.featured_image_thumbnail_url)}}),angular.module("santeplusApp").directive("menu",function(){return{controller:["$scope","$http",function(a,b){b.get("http://www.santeplusmag.com/wp-json/wp-api-menus/v2/menus/46").success(function(b){console.log(b),_.each(b.items,function(a){a.slug=a.url.substring(a.url.indexOf(".com/")+5,a.url.length-1)}),a.menu=b})}],restrict:"E",templateUrl:"views/menu.html",link:function(a,b,c){$(".nav").on("click",function(){$(".btn-navbar").click(),$(".navbar-toggle").click()})}}}),$(document).click(function(a){var b=$(a.target),c=$(".navbar-collapse").hasClass("collapse in");c!==!0||b.hasClass("navbar-toggle")||$("button.navbar-toggle").click()}),angular.module("santeplusApp").service("menuService",["$http","$q",function(a,b){function c(a){return angular.isObject(a.data)&&a.data.message?b.reject(a.data.message):b.reject("An unknown error occurred.")}function d(a){return a.data}var e=[];this.getElements=function(){var b=a({method:"get",url:"http://www.santeplusmag.com/wp-json/wp-api-menus/v2/menus/46",params:{action:"get"}});return b.then(d,c)},this.getMenuElements=function(){return _.each(e,function(a){a.slug=a.url.substring(a.url.indexOf(".com/")+5,a.url.length-1)}),console.log(e),e},this.setElements=function(a){this.elements=a}}]),angular.module("santeplusApp").controller("CategorieCtrl",["$scope","$routeParams","articleService",function(a,b,c){var d=b.slug;c.init(),c.getArticlesByCategory(d).then(function(b){c.populateArticles(b),a.articles=c.getCurrentArticles()}),a.loadMore=function(){c.getArticlesByCategory(d).then(function(b){c.populateArticles(b),a.articles=c.getCurrentArticles()})},a.currentArticle={id:0}}]),angular.module("santeplusApp").run(["$templateCache",function(a){a.put("views/about.html",'<div id="article"> <p><h2 class="H2post">Les&nbsp;signes&nbsp;du zodiaque chinois peuvent révéler des informations très intéressantes sur votre personnalité. En fait, l’astrologie chinoise se base sur des principes calendaires et astronomiques traditionnels. Existant depuis des millénaires, l’astrologie chinoise comporte un cycle de 12 années, représentées chacune par les 12 animaux correspondant aux 12 signes du zodiaque chinois. Découvrez ce que votre&nbsp;signe&nbsp;du zodiaque&nbsp;chinois dit de vous&nbsp;!</h2> </p><p>Pour connaître quel est votre signe du zodiaque chinois, il est important de savoir que le début de l’année dans le calendrier chinois varie d’une année à l’autre et a souvent lieu vers fin janvier ou début février. Donc, si vous êtes né vers le début du mois de janvier ou avant le commencement de l’année chinoise, il vaudrait mieux lire la description de l’année précédente.</p> <h3 class="H3post">L’année du Rat</h3> <p>(1912, 1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020)</p> <p>Les personnes&nbsp;<a href="http://www.santeplusmag.com/ce-que-votre-mois-de-naissance-revele-sur-vous/" target="_blank">nées</a>&nbsp;pendant l’année du Rat sont charmantes et à leur aise dans les différentes situations sociales. En effet, elles sont particulièrement populaires et très douées dans le domaine du business. Elles sont également connues pour leur esprit critique et leur tendance à s’emporter trop vite. Les Rats peuvent être opportunistes, mais cela ne les empêche pas de valoriser les relations et d’être très généreux et passionnés, tant en amour qu’en affaires.</p> <h3 class="H3post">L’année du Bœuf/Buffle</h3> <p>(1913, 1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021)</p> <p>Les personnes du signe du Bœuf sont très représentatives de l’expression «&nbsp;fort comme un bœuf&nbsp;», grâce à leur incroyable capacité à gérer et à faire face en toutes circonstances. Elles sont méthodiques dans la gestion de leurs responsabilités et sont très respectées pour leur confiance en elles et leurs grandes capacités. Cependant, elles font parfois preuve de chauvinisme, d’intransigeance, prêtes à tout pour défendre leurs intérêts envers et contre tous. Elles ont un sens du devoir admirable, ce qui impacte leur vie personnelle généralement très stable mais très ennuyeuse et moins passionnée. Les Bœufs sont extrêmement fidèles à leur famille et leur partenaire.</p> <h3 class="H3post">L’année du Tigre</h3> <p>(1914, 1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022)</p> <p>Les gens nés pendant l’année du Tigre sont très sensibles et en harmonie avec leurs émotions, ce qui fait d’eux des partenaires et des parents formidables. Ils sont de nature passionnés, compétitifs et dominants, et possèdent une capacité étonnante à trouver l’équilibre entre ces états. Ils sont connus pour leur capacité à dépasser les situations négatives même s’ils peuvent parfois déprimer à cause d’une critique. Ils sont également de grands leaders courageux et à la hauteur des défis.</p> <h3 class="H3post">L’année du Lapin/Lièvre</h3> <p>(1915, 1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023)</p> <p>Les natifs de l’année du Lapin sont généralement très appréciés car ils sont affectueux, agréables et polis. Ils aiment rester en dehors des disputes, des controverses et des querelles et préfèrent de loin les activités amusantes et agréables. Ils sont d’ailleurs facilement distraits par l’amusement, au point d’en oublier les besoins des personnes qu’ils aiment. Malgré cette inclinaison à vouloir passer du bon temps, ils sont aussi connus pour leur côté calme, conservateur et intellectuel. Certaines personnes les prennent pour des gens superficiels, mais ils sont en réalité très tendres et cherchent la sécurité dans leurs&nbsp;<a href="http://www.santeplusmag.com/couple-voici-comment-savoir-si-vous-avez-une-relation-saine/" target="_blank">relations</a>.</p> <h3 class="H3post">L’année du Dragon</h3> <p>(1916, 1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024)</p> <p>Les&nbsp;<a href="http://www.santeplusmag.com/voici-pourquoi-les-personnes-aux-yeux-bleus-sont-si-speciales/" target="_blank">personnes</a>&nbsp;appartenant à ce signe sont généralement débordantes d’énergies (limite bruyantes), talentueuses et très intelligentes. Elles sont aussi perfectionnistes, ce qui les rend très exigeantes envers elles-mêmes et envers les autres. Les défis sont pour elles des occasions de mettre en œuvre leurs talents et leur énergie. Le partage des expériences de vie est beaucoup plus important pour elles que les relations engagées.</p> <h3 class="H3post">L’année du Serpent</h3> <p>(1917, 1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025)</p> <p>Les natifs du Serpent sont de profonds penseurs. Ils sont dotés d’une grande sagesse qui leur permet de réaliser leurs objectifs en toute discrétion. Ils ont un côté romantique et charmeur, qui donne une certaine élégance à leurs relations, mais cela ne les empêche pas de faire preuve de jalousie. Ils ont également tendance à tenir le tout secret, ce qui leur confère un air solitaire.</p> <h3 class="H3post">L’année du Cheval</h3> <p>(1918, 1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026)</p> <p>L’expression «&nbsp;travailler comme un cheval&nbsp;» est on ne peut plus vraie pour les personnes de ce signe. En effet, elles sont capables de fournir un effort colossal dans le cadre de leur travail, ce qui explique leur grand succès. Elles sont parfois défiées par leurs propres sentiments, car elles peuvent faire preuve d’impulsivité et de tempérament enflammé, surtout en amour. Elles préfèrent aussi le travail indépendant et peuvent être prises pour des personnes égoïstes. Heureusement, leurs excellentes capacités intellectuelles et verbales sont là pour préserver leur popularité.</p> <h3 class="H3post">L’année de la Chèvre</h3> <p>(1919, 1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027)</p> <p>Les natifs de l’année de la Chèvre sont très appréciés, charmants, sociables mais aussi réservés. Ils sont également gentils, sensibles et sympathiques, avec une nature créative et artistique. Cependant, ils sont souvent sujets à un certain inconfort physique dont ils n’hésiteront pas à se plaindre, et sont pessimistes. Ils oscillent entre les deux extrémités d’une solide confiance en soi et d’une timidité certaine. En&nbsp;<a href="http://www.santeplusmag.com/15-choses-tuent-nimporte-relation-amoureuse/" target="_blank">relations</a>&nbsp;amoureuses, ils sont satisfaits tant qu’il y a de la sécurité.</p> <h3 class="H3post">L’année du Singe</h3> <p>(1920, 1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028)</p> <p>Les personnes nées pendant l’année du Singe sont intelligentes, débordantes d’<a href="http://www.santeplusmag.com/5-facons-darreter-dabsorber-lenergie-negative-des-gens/" target="_blank">énergie</a>, avec une personnalité charismatique qui attire les foules. Elles ont l’esprit vif et tournent facilement tous les contextes en situations comiques. À cause de ce côté légèrement excentrique, certaines personnes pensent que les Singes ne sont pas responsables et dignes de confiance. D’ailleurs, leur énergie débordante ne leur facilite pas le choix de carrière, car ils ne peuvent réussir que dans un environnement dynamique et changeant.</p> <h3 class="H3post">L’année du Coq</h3> <p>(1921, 1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029)</p> <p>Le&nbsp;<a href="http://www.santeplusmag.com/les-trois-femmes-a-epouser-selon-les-signes-du-zodiaque-tout-le-monde-se-met-a-genoux-devant-la-troisieme/" target="_blank">signe</a>&nbsp;du Coq est connu pour son assiduité et son implication au travail, et pour sa facilité naturelle à exprimer son opinion et à la partager. Il aime être sous les feux de l’attention et a du mal à la partager, ce qui explique parfois son choix vestimentaire tape-à-l’œil. Malgré ses standards parfois exagérément méticuleux, il a beaucoup d’amis et est très loyal et authentique dans ses émotions et ses relations. D’ailleurs, ce sont ces mêmes standards qui garantissent son succès dans le domaine des affaires.</p> <h3 class="H3post">L’année du Chien</h3> <p>(1922, 1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030)</p> <p>Les personnes de ce&nbsp;<a href="http://www.santeplusmag.com/ce-que-votre-signe-du-zodiaque-dit-de-vous-et-de-votre-sante/" target="_blank">signe</a>&nbsp;sont connues pour leur loyauté et leur honnêteté dans les relations. Ils se concentrent sur un seul objectif et s’y impliquent corps et âme. Ils ont de solides principes de justice et d’équité, et une grande capacité à résoudre les problèmes. Leurs principaux défauts sont leur «&nbsp;langue tranchante&nbsp;» et leur besoin constant de tout critiquer. En tant qu’amis et partenaires, elles sont dignes de confiance mais sont parfois rancunières. Leur besoin profond de relations durables en fait des partenaires à vie, surtout s’ils considèrent qu’ils ont trouvé leur âme sœur.</p> <h3 class="H3post">L’année du Cochon</h3> <p>(1923, 1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031)</p> <p>Les natifs de l’année du Cochon sont de magnifiques compagnons parce qu’ils sont gentils, sincères et très intellectuels. Ils sont de très bons orateurs et aiment relever les défis, connus pour leur sens de l’humour et leur esprit vif. Cependant, leur principal&nbsp;<a href="http://www.santeplusmag.com/5-femmes-fortes-qui-refusent-de-laisser-leur-defaut-physique-les-definir/" target="_blank">défaut</a>&nbsp;est la naïveté&nbsp;: ils s’attendent à recevoir les mêmes attentions de la part des autres. Même s’ils sont enclins aux indulgences physiques et matérielles, ils sont très attachés à leur famille et à leur foyer.</p> <p>&nbsp;</p>  </div>'),a.put("views/article-item.html",'<div class="article-item" style="background :#fff"> <a ng-href="#!/{{article.relative_permalink}}" class="article-item-image"> <img class="img-article" ng-src="{{article.featured_image_thumbnail_url}}"> </a> <h4 class="article-category" ng-bind-html="article.category_name"></h4> <a ng-href="#!/{{article.relative_permalink}}" class="article-item-title"> <h1 ng-bind-html="article.title.rendered"> </h1> </a> <p ng-bind-html="article.excerpt.rendered" class="article-item-text"> </p> <div class="partage-button-home" style="border-top: #ECECEC solid 1px"> <ul class="socialbar" style="display: -webkit-inline-box !important; list-style-type: none !important; padding: 0; width: 215px; margin: auto"> <li> <a href="http://www.facebook.com/sharer.php?u={{article.link|encodeUri}}&t={{article.title.rendered}}" data-icon="facebook" target="_blank" xtclib="share::facebook"> <img class="share_btn" src="images/Facebook.c6a06d45.svg"> </a> </li> <li> <a href="whatsapp://send?text={{article.link|encodeUri}}" data-icon="whatsapp" xtclib="share::whatsapp"> <img class="share_btn" src="images/WhatsApp.1d7adbb5.svg"> </a> </li> <li> <a target="_blank" href="http://pinterest.com/pin/create/button/?url={{article.link|encodeUri}}&media={{article.featured_image_thumbnail_url}}&description={{article.title.rendered}}" class="pin-it-button" count-layout="horizontal"> <img border="0" class="share_btn" src="images/Pinterest.990a1a24.svg" title="Pin It"> </a> </li> <li> <a class="twitter-share-button" href="https://twitter.com/intent/tweet?text={{article.title.rendered}} http://www.santeplusmag.com/?p={{article.id}}" data-size="large"> <img border="0" class="share_btn" src="images/Twitter.e448bb08.svg" title="Pin It"> </a> </li> </ul> </div> </div>'),a.put("views/article.html",'<div class="wrapper"> <div in-view="hideFooter($inview)"> <ad-placement-dfp adunit-code="NEW_SPM_HEADR" adunit-dimensions="300x250,336x280"></ad-placement-dfp> <div id="article" class="article_container"> <h1 ng-bind-html="currentArticle.title.rendered"></h1> <img class="img-article" ng-src="{{currentArticle.featured_image_thumbnail_url}}"> <h4 ng-bind-html="currentArticle.author_name" style="color:#337AB7;font-size:14px"></h4> <p id="content" ng-bind-html="currentArticle.content.rendered | trusted"></p> </div> </div> <ad-placement-ligatus></ad-placement-ligatus> <ad-placement-taboola></ad-placement-taboola> <div> <div ng-include="\'views/main.html\'"></div> </div> </div> <div ng-show="isVisible" class="footer" style="background: rgba(255, 255, 255, 0)"> <div class="partage-button"> <ul class="socialbar" style="display: -webkit-inline-box !important; list-style-type: none !important; padding: 0; width: 215px; margin: auto"> <li> <a href="http://www.facebook.com/sharer.php?u={{currentArticle.link|encodeUri}}&t={{currentArticle.title.rendered}}" data-icon="facebook" target="_blank" xtclib="share::facebook"> <img class="share_btn" src="images/Facebook.c6a06d45.svg"> </a> </li> <li> <a href="whatsapp://send?text={{currentArticle.link|encodeUri}}" data-icon="whatsapp" xtclib="share::whatsapp"> <img class="share_btn" src="images/WhatsApp.1d7adbb5.svg"> </a> </li> <li> <a target="_blank" href="http://pinterest.com/pin/create/button/?url={{currentArticle.link|encodeUri}}&media={{currentArticle.featured_image_thumbnail_url}}&description={{currentArticle.title.rendered}}" class="pin-it-button" count-layout="horizontal"> <img border="0" class="share_btn" src="images/Pinterest.990a1a24.svg" title="Pin It"> </a> </li> <li> <a class="twitter-share-button" href="https://twitter.com/intent/tweet?text={{currentArticle.title.rendered}} http://www.santeplusmag.com/?p={{currentArticle.id}}" data-size="large"> <img border="0" class="share_btn" src="images/Twitter.e448bb08.svg" title="Pin It"> </a> </li> <!-- <li>\n                <button class="btn btn-next" ng-click="nextArticle()" ng-if="articles.length > 0">Article Suivant</button>\n            </li> --> </ul> </div> </div>'),a.put("views/categorie.html","<p>This is the categorie view.</p>"),a.put("views/loading.html",""),a.put("views/main.html",'<div id="articles" when-scroll-ends="loadMore()"> <div ng-repeat="article in articles | without:currentArticle.id" class="article-list"> <ad-placement-dfp ng-if="$index % 6 == 0 && $index != 0" adunit-code="NEW_MOBILE_HOME" adunit-dimensions="300x250,336x280" adunit-targeting="{&quot;position&quot;: &quot;{{$index}}&quot; }"></ad-placement-dfp> <div class="article-item-parent"> <article-item></article-item> </div> <ad-placement-dfp ng-if="$index % 6 == 2" adunit-code="NEW_MOBILE_HOME" adunit-dimensions="300x250,336x280" adunit-targeting="{&quot;position&quot;: &quot;{{$index}}&quot; }"></ad-placement-dfp> </div> </div>'),a.put("views/menu.html",'<ul class="nav navbar-nav"> <li ng-repeat="item in menu.items"> <a ng-href="#!/categorie/{{item.slug}}" ng-bind-html="item.title"></a> </li> </ul>'),a.put("views/user.html","<p>This is the user view.</p>")}]);