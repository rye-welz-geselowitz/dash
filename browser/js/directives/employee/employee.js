'use strict';

app.directive('employee', function (AuthService, $state, LoginFactory,$rootScope) {
  return {
    restrict: 'E',
    scope: {
      employee: '='
    },
    templateUrl: 'js/directives/employee/employee.html',
    link: function (scope, elem, attrs) {
      scope.getInitials=function(name){
        var toReturn=name[0];

        for(var i=1;i<name.length;i++){
          if(name[i]==' '&&(i+1)<name.length){
            toReturn+=name[i+1];
          }
        }
        return toReturn;
      }
      scope.goToDetail=function(employee){
        $state.go('employee',{employee:employee, id:employee.id});
      }
    }

  }
});