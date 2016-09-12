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

app.controller('EmployeeDetailCtrl', function ($scope,$stateParams,EmployeeFactory) {
   console.log('this sure is an employee');
   if($stateParams.employee){
        $scope.employee=$stateParams.employee;
    }
    else{
        EmployeeFactory.fetchById($stateParams.id)
        .then(function(employee){
            $scope.employee=employee;
        })
    }

});