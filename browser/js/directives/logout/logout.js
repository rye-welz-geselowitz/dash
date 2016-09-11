'use strict';

app.directive('logout', function (AuthService, $state, LoginFactory, $rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/logout/logout.html',
    link: function (scope, elem, attrs) {
      console.log('LOG OUT')
      scope.sendLogout= function () {
          console.log($rootScope.currentCompany)

          console.log('logigng out')
          LoginFactory.logout();
          console.log($rootScope.currentCompany)
      };      
    }
  }
});