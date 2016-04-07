'use strict';

var app = angular.module('testApp');


app.controller('beerCtrl', function($scope, BeerService, $http) {

  $scope.getRandomBeer = function(){
    BeerService.getRandomBeer()
      .then(function(res){
      }, function(err){
        console.log(err)
      })
    }
});