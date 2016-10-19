"use strict";angular.module("videoClientApp",["videojsModule"]);var app=angular.module("videoClientApp");app.factory("toastrFactory",function(){return{error:function(a){toastr.warning("We are currently unable to recover the videos for you, please try again later.")}}}),angular.module("videojsModule",[]).factory("videojs",["$window",function(a){var b=a.videojs;try{delete a.videojs}catch(c){a.videojs=void 0}return b}]);var app=angular.module("videoClientApp");app.service("videoService",["$http","toastrFactory",function(a,b){function c(){return h&&h.length?h:a({method:"GET",url:"data/videos.json"}).then(function(a){return a.data},function(a){return b.error(),[]})}function d(){if(i>=h.length)return{error:"You have reached the end of the list"};var a=h[i];return a}function e(){return d()}function f(){i++;var a=d();return a}function g(){return i=0,d()}var h=[],i=0;return c().then(function(a){return h=a,{getCurrentVideo:e,getNextVideo:f,getFirstVideo:g}})}]),angular.module("videoClientApp").controller("MainCtrl",function(){});var app=angular.module("videoClientApp");app.directive("videoPlayer",["$sce","$timeout","videojs","videoService",function(a,b,c,d){return{restrict:"E",replace:"true",templateUrl:"views/directiveTemplates/videoLoader.html",link:function(a){function e(c){if(!c||c.error)return a.showPlayer=!1,void b(function(){a.$apply()});if(!f.canPlayType(c.type))return a.next();f.src(c);try{f.load(),f.ready(function(){f.play()})}catch(d){a.next()}}a.showPlayer=!0;var f=c("video_container");f.on("ended",function(){a.next()}),f.on("error",function(){f.pause(),a.next()}),d.then(function(a){e(a.getCurrentVideo())}),a.reload=function(){d.then(function(a){e(a.getCurrentVideo())})},a.next=function(){d.then(function(a){e(a.getNextVideo())})},a.first=function(){d.then(function(a){e(a.getFirstVideo())})},a.restart=function(){a.showPlayer=!0,a.first()}}}}]),angular.module("videoClientApp").run(["$templateCache",function(a){a.put("views/directiveTemplates/videoLoader.html",'<div class="row"> <div ng-show="showPlayer" class="text-center col-md-12 col-lg-12"> <div class="row spaced-row"> <button type="button" class="btn btn-sm btn-primary" ng-click="next()">Next Video</button> </div> <video id="video_container" class="video-js vjs-big-play-centered center-block" controls height="300" poster="http://www.energymanagertoday.com/wp-content/plugins/video-thumbnails/default.jpg" data-setup="{&quot;techOrder&quot;: [&quot;html5&quot;, &quot;flash&quot;]}"> </video> </div> <div ng-hide="showPlayer" class="jumbotron text-center"> <h5>There are no more available videos</h5> <button type="button" class="btn btn-success" ng-click="restart()">Go back to the beginning!</button> </div> </div>'),a.put("views/main.html","")}]);