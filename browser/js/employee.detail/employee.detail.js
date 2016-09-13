app.config(function ($stateProvider) {
    $stateProvider.state('employee', {
        url: '/employee/:id',
        params: {
            employee:null
        },
        templateUrl: 'js/employee.detail/employee.detail.html',
        controller: 'EmployeeDetailCtrl'
    });
});

app.controller('EmployeeDetailCtrl', function ($scope,$stateParams,EmployeeFactory,$state) {
   console.log('this sure is an employee');
   $scope.editMode=false;
    var parseDate=function(dateString){
        return new Date(dateString);
    }
    var formatPhone=function(number){
        if(number.length===10){
            number='('+number.slice(0,3)+') '+ number.slice(4,7) + '-' +number.slice(6,11);
        }
        else if(number.length===11){
            number='+'+number.slice(0,1)+' ('+number.slice(1,4)+') '+ number.slice(5,8) + '-' +number.slice(7,12);
        }
        return number;
    }
   if($stateParams.employee){
        $scope.employee=$stateParams.employee;
        $scope.employee.hireDate=parseDate($scope.employee.hireDate);
        $scope.employee.phone=formatPhone($scope.employee.phone);
    }
    else{ //TODO: SEEMS LIKE THERE SHOULD BE A BETTER WAY
        EmployeeFactory.fetchById($stateParams.id)
        .then(function(employee){
            $scope.employee=employee;
            $scope.employee.hireDate=parseDate($scope.employee.hireDate);
            $scope.employee.phone=formatPhone($scope.employee.phone);

        })
    }


    // $scope.toggleEditMode=function(){
    //     $scope.editMode=!$scope.editMode;
    // }
    $scope.goBack=function(){
        $state.go('dashboard');
    }
    var stripPhone=function(phoneString){
        var toReturn='';
        for(var i=0;i<phoneString.length;i++){
            if(phoneString[i].match(/\d/)){
                toReturn+=(phoneString[i]);
            }
        }
        return toReturn;
    }
    $scope.saveInfo=function(employee){
        console.log(employee);
        employee.phone=stripPhone(employee.phone);
        EmployeeFactory.update(employee.id, employee)
        .then(function(updatedEmployee){
            console.log(updatedEmployee);
        })
    }



});