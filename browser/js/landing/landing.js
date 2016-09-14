app.config(function ($stateProvider) {
    $stateProvider.state('landing', {
        url: '/landing',
        templateUrl: 'js/landing/landing.html',
        controller: 'LandingCtrl'
    });
});

app.controller('LandingCtrl', function ($scope,LoginFactory,$state) {
    //If user already logged in, go straight to dashboard
    LoginFactory.getLoggedInUser()
    .then(function(user){
        $state.go('dashboard');
    })
    //toggling between login and signup mode
	var messages={'signup': 'I already have an account!', 'login': "I don't have an account yet!"}
    $scope.signUpMode=false;
    $scope.message=messages['login'];
    $scope.toggleSignUpMode=function(){
    	$scope.signUpMode=!$scope.signUpMode;
    	if($scope.signUpMode) $scope.message=messages['signup'];
    	else $scope.message=messages['login'];
    }
});