app.config(function ($stateProvider) {
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: 'js/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
    });
});

app.controller('DashboardCtrl', function ($scope,EmployeeFactory,LoginFactory,$rootScope,$state) {
    $scope.sortAttribute='name';
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
        var now=Date.now();
        for(var i=0;i<$scope.employees.length;i++){
            $scope.employees[i].timeSinceHired=now-new Date($scope.employees[i].hireDate);
        }
        console.log(employees);
    })
    .catch(function(){
        $state.go('landing');
    })
    $scope.goToDetail=function(employee){
        $state.go('employee');
    }
    $scope.sortBy=function(attribute){
        if(attribute==='timeSinceHired'&&$scope.sortAttribute==='timeSinceHired'){
            console.log(' 1 true')
            $scope.sortAttribute='-timeSinceHired'
        }
        else if(attribute==='timeSinceHired'&&$scope.sortAttribute==='-timeSinceHired'){
                        console.log(' 2 true')

            $scope.sortAttribute='timeSinceHired'
        }  
        else{
            $scope.sortAttribute=attribute;
  
        }      
    }

});