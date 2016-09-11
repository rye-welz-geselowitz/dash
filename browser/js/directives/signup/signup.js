'use strict';

app.directive('signup', function (LoginFactory,AuthService,$state, $rootScope) {
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
        .then(function(){
          return LoginFactory.getLoggedInUser()
        })
        .then(function(company){
          $rootScope.currentCompany=company;
        })
        .then(function() {
          $state.go('employeeslist')
          console.log('signed up!')
        });
      }
    }
  }
});