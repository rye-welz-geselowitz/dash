app.config(function ($stateProvider) {
    $stateProvider.state('account', {
        url: '/account',
        templateUrl: 'js/account/account.html',
        controller: 'AccountCtrl'
    });
});

app.controller('AccountCtrl', function ($scope,$rootScope,LoginFactory) {
	LoginFactory.redirect();
	if(!$rootScope.currentCompany){
		LoginFactory.getLoggedInUser()
		.then(function(user){
			$rootScope.currentCompany=user;
		})
	}
});