app.config(function ($stateProvider) {
    $stateProvider.state('employeeslist', {
        url: '/employeeslist',
        templateUrl: 'js/employees/employees.list.html',
        controller: 'EmployeesListCtrl'
    });
});

app.controller('EmployeesListCtrl', function ($scope,EmployeeFactory,LoginFactory,$rootScope) {
    console.log('employees of ',$rootScope.currentCompany);

    // console.log(req.userId);
    // EmployeeFactory.fetchAll()
    LoginFactory.getLoggedInUser()
    .then(function(user){
        console.log(user.name)
        return EmployeeFactory.fetchAll(user.id)
    })
    .then(function(employees){
        $scope.employees=employees;
        console.log(employees);
    })


});