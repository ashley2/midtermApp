'use strict';

var app = angular.module('testApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', { 
    url: '/',
    templateUrl: '/html/home.html'
  })
  .state('login', {
    url: "/",
    templateUrl: "/html/login.html",
    controller: "loginCtrl"
  })
  .state('profile', {
    url: "/profile/",
    templateUrl: "/html/profile.html",
    controller: "profileCtrl"
  })
  .state('beer', {
    url: "/beer/",
    templateUrl: "/html/beer.html",
    controller: "beerCtrl"
  })

  $urlRouterProvider.otherwise('/');
});

