'use strict';

app.directive('employee', function (AuthService, $state, LoginFactory,$rootScope) {
  return {
    restrict: 'E',
    scope: {
      employee: '='
    },
    templateUrl: 'js/directives/employee/employee.html',
    link: function (scope, elem, attrs) {
      console.log('employee');      
    }
  }
});