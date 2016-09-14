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

app.controller('EmployeeDetailCtrl', function ($scope,$stateParams,EmployeeFactory,$state,LoginFactory) {
   console.log('this sure is an employee');
    LoginFactory.redirect();

   $scope.addMode=false;
    var parseDate=function(dateString){
        return new Date(dateString);
    }
   if($stateParams.employee){
        $scope.employee=$stateParams.employee;
        $scope.employee.hireDate=parseDate($scope.employee.hireDate);
        // $scope.employee.phone=formatPhone($scope.employee.phone);
    }
    else if($stateParams.id){ //TODO: SEEMS LIKE THERE SHOULD BE A BETTER WAY
        EmployeeFactory.fetchById($stateParams.id)
        .then(function(employee){
            $scope.employee=employee;
            $scope.employee.hireDate=parseDate($scope.employee.hireDate);
            // $scope.employee.phone=formatPhone($scope.employee.phone);

        })
    }
    else{
        $scope.addMode=true;
        $scope.employee={};
        $scope.employee.hireDate=new Date();
    }
    $scope.goBack=function(){
        $state.go('dashboard');
    }
    var stripPhone=function(phoneString){
        if(!phoneString){
            return;
        }
        var toReturn='';
        for(var i=0;i<phoneString.length;i++){
            if(phoneString[i].match(/\d/)){
                toReturn+=(phoneString[i]);
            }
        }
        return toReturn;
    }
    $scope.saveInfo=function(employee){
        employee.phone=stripPhone(employee.phone);
        if($scope.addMode){
            EmployeeFactory.addNew(employee)
            .then(function(updatedEmployee){
                $scope.goBack();
            })        
        }
        else{
            EmployeeFactory.update(employee.id, employee)
            .then(function(updatedEmployee){
                console.log(updatedEmployee);
                $scope.goBack();
            })
        }

    }
    document.getElementById("phoneInput").onkeypress = function(e) {
        var chr = String.fromCharCode(e.which);
        if ("0123456789".indexOf(chr) < 0)
            return false;
    };
    $scope.deleteEmployee=function(){
        EmployeeFactory.delete($scope.employee.id)
        .then(function(){
            $state.go('dashboard');
        })
    }


});