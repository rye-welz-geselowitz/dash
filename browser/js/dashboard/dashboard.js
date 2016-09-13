app.config(function ($stateProvider) {
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: 'js/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
    });
});

app.controller('DashboardCtrl', function ($scope,EmployeeFactory,LoginFactory,$rootScope,$state) {
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
    .catch(function(){
        $state.go('landing');
    })
    $scope.goToDetail=function(employee){
        $state.go('employee');
    }
});