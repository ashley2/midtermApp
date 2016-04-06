var app = angular.module('testApp');

app.controller('loginCtrl', function($scope, UserService, $state) {
  $scope.login = function(user) {
    UserService.login(user)
      .then(function(res) {
        $state.go('profile')
        console.log('res:', res);
      }, function(err) {
        console.error(err);
      });
  }
});


});
