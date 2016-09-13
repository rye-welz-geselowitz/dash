'use strict';

app.directive('signup', function (LoginFactory,AuthService,$state, $rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/signup/signup.html',
    link: function (scope, elem, attrs) {
      scope.error=null;
      scope.sendSignup = function(info) {
        console.log('info', info);
        LoginFactory.signup(scope.signup)
        .then(function() {
          return AuthService.login(info)
        })
        .then(function(){
          return LoginFactory.getLoggedInUser()
        })
        .then(function(company){
          $rootScope.currentCompany=company;
        })
        .then(function() {
          $state.go('dashboard')
        })
        .catch(function(){
          scope.error='That email already exists in our system.'
        })
      }
    }
  }
});