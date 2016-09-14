'use strict';
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
    //redirect to landing if now logged in 
    LoginFactory.redirect();
    //assume we are editing, not adding an employee
    $scope.addMode=false;
    //convert date to JS date typ
    var parseDate=function(dateString){
        return new Date(dateString);
    }
    //grab employee from state params and parse date
    if($stateParams.employee){
        $scope.employee=$stateParams.employee;
        $scope.employee.hireDate=parseDate($scope.employee.hireDate);
    }
    //or, on refresh, query database for employee
    else if($stateParams.id){ 
        EmployeeFactory.fetchById($stateParams.id)
        .then(function(employee){
            $scope.employee=employee;
            $scope.employee.hireDate=parseDate($scope.employee.hireDate);
        })
    }
    //if we have neither employee nor id, we know we are adding a new employee
    else{
        $scope.addMode=true;
        $scope.employee={};
        //hire date defaults to today
        $scope.employee.hireDate=new Date();
    }
    //back button
    $scope.goBack=function(){
        $state.go('dashboard');
    }
    //converts phone to digits only
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
    //save info to DB
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
                $scope.goBack();
            })
        }

    }
    //don't allow non-numerical characters in phone input field
    document.getElementById("phoneInput").onkeypress = function(e) {
        var chr = String.fromCharCode(e.which);
        if ("0123456789".indexOf(chr) < 0)
            return false;
    };
    //delete employee
    $scope.deleteEmployee=function(){
        EmployeeFactory.delete($scope.employee.id)
        .then(function(){
            $state.go('dashboard');
        })
    }


});