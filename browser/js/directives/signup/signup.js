'use strict';
/*The signup directive is also used on the 'my account' page. In this case, set mode='edit'*/
app.directive('signup', function (LoginFactory,AuthService,$state, $rootScope) {
  return {
    restrict: 'E',
    scope: {
      mode: '@',
      signup: '='
    },
    templateUrl: 'js/directives/signup/signup.html',
    link: function (scope, elem, attrs) {
      scope.signuperror=null;
      //If this directive is used on the 'my account' page, display password as empty string
      if(scope.signup){
            scope.signup.password='';
      }
      scope.sendSignup = function(info) {
        //if directive on my account page...
        if(scope.mode==='edit'){
          console.log('hey')
          AuthService.login({email:scope.signup.email,password:scope.signup.password})
          .then(function(){
            LoginFactory.update({name:scope.signup.name, email:scope.signup.email},$rootScope.currentCompany.id)
            .then(function(company){
              console.log('after update',company);
              $rootScope.currentCompany=company;
              $state.go('dashboard');
            })   
          })
          .catch(function(){
            scope.signuperror="That's not your password!"
          })
        }
        //otherwise...
        else{
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
            scope.signuperror='That email already exists in our system.'
          })
      }
    }
  }
}
});