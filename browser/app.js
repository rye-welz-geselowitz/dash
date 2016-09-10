'use strict';

var app = angular.module('dash', ['fsaPreBuilt','ui.router']);

app.config(function ($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true); //turns off #, but this doesn't completely work yet
  $urlRouterProvider.otherwise('/');
});

app.run(function(){
	console.log('running!')
})
