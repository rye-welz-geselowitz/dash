app.config(function ($stateProvider) {
    $stateProvider.state('employeeslist', {
        url: '/employeeslist',
        templateUrl: 'js/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
    });
});

app.controller('DashboardCtrl', function ($scope,EmployeeFactory,LoginFactory,$rootScope) {
    console.log('employees of ',$rootScope.currentCompany);
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