'use strict';

app.directive('login', function (AuthService, $state, LoginFactory,$rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/login/login.html',
    link: function (scope, elem, attrs) {
      // scope.login = {};
      // scope.error = null;
      // LoginFactory.login();

      scope.sendLogin = function (loginInfo) {
          // scope.error = null;
          LoginFactory.login(loginInfo)
          .then(function(){
              LoginFactory.getLoggedInUser()
            .then(function(user){
              $rootScope.currentCompany=user;
            })
          })
          // LoginFactory.getLoggedInUser()
          // .then(function(user){
          //   $rootScope.currentCompany=user;
          // })
          // .then(function(){
          //   return LoginFactory.getLoggedInUser();
          // })
          // .then(function(user){
          //   $rootScope.currentCompany=user;
          // })
      };      
    }
  }
});