'use strict';

var app = angular.module('dash', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
});

app.run(function(){
	console.log('running!')
})
