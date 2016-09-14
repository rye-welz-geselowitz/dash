'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('account', {
        url: '/account',
        templateUrl: 'js/account/account.html',
        controller: 'AccountCtrl'
    });
});

app.controller('AccountCtrl', function ($scope,$rootScope,LoginFactory) {
	//redirect if not logged in
	LoginFactory.redirect();
	//populate fields on refresh
	if(!$rootScope.currentCompany){
		LoginFactory.getLoggedInUser()
		.then(function(user){
			$rootScope.currentCompany=user;
			$scope.currentCompany=JSON.parse(JSON.stringify($rootScope.currentCompany));
			$scope.currentCompany.password='';
		})
	}
});