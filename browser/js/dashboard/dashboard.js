app.config(function ($stateProvider) {
    $stateProvider.state('employeeslist', {
        url: '/employeeslist',
        templateUrl: 'js/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
    });
});

app.controller('DashboardCtrl', function ($scope,EmployeeFactory,LoginFactory,$rootScope) {
    LoginFactory.getLoggedInUser()
    .then(function(user){
        console.log(user.name)
        if(!$rootScope.currentCompany){
            $rootScope.currentCompany=user;
        }
        return EmployeeFactory.fetchAll(user.id)
    })
    .then(function(employees){
        $scope.employees=employees;
        console.log(employees);
    })


});