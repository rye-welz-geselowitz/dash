'use strict';

var app = angular.module('dash', ['fsaPreBuilt','ui.router','ngMaterial', 'ngMessages']);

app.config(function ( $urlRouterProvider, $locationProvider,$mdThemingProvider) {
$mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('teal');
  $locationProvider.html5Mode(true); //turns off #, but this doesn't completely work yet
  $urlRouterProvider.otherwise('/landing');
});

app.run(function(){
	console.log('running!')
})
