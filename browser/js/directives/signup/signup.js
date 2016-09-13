'use strict';

app.directive('signup', function (LoginFactory,AuthService,$state, $rootScope) {
  return {
    restrict: 'E',
    scope: {
      mode: '@',
      signup: '='
    },
    templateUrl: 'js/directives/signup/signup.html',
    link: function (scope, elem, attrs) {
      console.log(scope.signup);
      scope.signuperror=null;
      scope.sendSignup = function(info) {
        if(scope.mode==='edit'){
          LoginFactory.update(scope.signup,$rootScope.currentCompany.id)
          .then(function(company){
            console.log('after update',company);
            $rootScope.currentCompany=company;
            $state.go('dashboard');
          })
        }
        else{
          LoginFactory.signup(scope.signup,$rootScope.currentCompany.id)
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
            scope.signuperror='That email already exists in our system.'
          })
      }
    }
  }
}
});