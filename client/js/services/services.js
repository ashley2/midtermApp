'use strict';

var app = angular.module('testApp');

app.service('UserService', function($http) {

  this.register = (user) => $http.post('/users/register', user);

  this.login = (user) => $http.post('/users/authenticate', user);
  
  this.getMe = () => $http.get('/users/me')

  this.getAll = () => $http.get('users/all')

  this.update = (user) => $http.put('/users', user);

});


app.service('BeerService', function($http) {

var key = 'd3a6e9af599d7fd0d670ecbaa52211b3';

  this.getRandomBeer = () => $http.get(`http://api.brewerydb.com/v2/?key=${key}`)
   

});