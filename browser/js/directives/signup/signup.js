'use strict';

app.directive('signup', function (LoginFactory,AuthService,$state) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/signup/signup.html',
    link: function (scope, elem, attrs) {
      scope.sendSignup = function(info) {
        console.log('info', info);
        LoginFactory.signup(scope.signup)
        .then(function() {
          return AuthService.login(info)
        })
        .then(function() {
          $state.go('employeeslist')
          console.log('signed up!')
        });
      }
    }
  }
});