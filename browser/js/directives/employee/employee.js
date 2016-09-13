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
      scope.parseDate=function(dateString){
        var date=new Date(dateString);
        var months={0:'Jan',1:'Feb',2:'Mar',3:'Apr',4:'May',5:'Jun',6:'Jul',7:'Aug',8:'Sep',9:'Oct',10:'Nov',11:'Dec'}
        return date.getDate()+' '+months[date.getMonth()]+' '+date.getFullYear();
      }
    }

  }
});