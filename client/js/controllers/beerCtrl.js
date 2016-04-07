'use strict';

var app = angular.module('testApp');


app.controller('beerCtrl', function($scope, UserService, $http) {

$scope.getRandomBeer = function(){
  console.log('click')
  .then(function(res){
   }, function(err){
    console.log(err)
   })
}

});