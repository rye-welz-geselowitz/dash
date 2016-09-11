app.config(function ($stateProvider) {
    $stateProvider.state('landing', {
        url: '/landing',
        templateUrl: 'js/landing/landing.html',
        controller: 'LandingCtrl'
    });
});

app.controller('LandingCtrl', function ($scope) {
    console.log('welcome');
});