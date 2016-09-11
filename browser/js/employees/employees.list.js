app.config(function ($stateProvider) {
    $stateProvider.state('employeeslist', {
        url: '/employeeslist',
        templateUrl: 'js/employees/employees.list.html',
        controller: 'EmployeesListCtrl'
    });
});

app.controller('EmployeesListCtrl', function ($scope,EmployeeFactory,LoginFactory) {
    console.log('employees');

    // console.log(req.userId);
    // EmployeeFactory.fetchAll()
    LoginFactory.getLoggedInUser()
    .then(function(user){
        return EmployeeFactory.fetchAll(user.id)
    })
    .then(function(employees){
        $scope.employees=employees;
        console.log(employees);
    })


});