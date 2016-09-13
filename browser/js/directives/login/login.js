'use strict';

app.directive('login', function (AuthService, $state, LoginFactory,$rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/login/login.html',
    link: function (scope, elem, attrs) {
      document.querySelector("input[type=password]").value = " ";
      document.querySelector("input[type=password]").value = "";
      document.querySelector("input[type=password]").blur()

      scope.sendLogin = function (loginInfo) {
          scope.loginerror = null;
          LoginFactory.login(loginInfo)
          .then(function(){
              LoginFactory.getLoggedInUser()
            .then(function(user){
              $rootScope.currentCompany=user;
            })
            .catch(function(){
              scope.loginerror='Incorrect email/password combination.'
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