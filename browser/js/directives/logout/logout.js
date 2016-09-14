'use strict';

app.directive('logout', function (AuthService, $state, LoginFactory, $rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/logout/logout.html',
    link: function (scope, elem, attrs) {
      scope.sendLogout= function () {
          LoginFactory.logout();
      };      
    }
  }
});