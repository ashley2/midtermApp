'use strict';

var app = angular.module('testApp');


app.controller('registerCtrl', function($scope, UserService) {
  $scope.register = function(user) {
    UserService.register(user)
      .then(function(res) {
        console.log('res:', res);
      }, function(err) {
         alert("Username already exists!\n Please log in")
        console.error(err);
      });
  };
});