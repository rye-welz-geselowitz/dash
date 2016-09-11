app.factory('LoginFactory', function ($http, AuthService,$state,$rootScope) {

    var LoginFactory = {};
    $rootScope.currentCompany=null;

    LoginFactory.getLoggedInUser = function () {
        return $http.get('/me')
            .then(function (res) {
                return res.data;
            })
            // .catch(function () {
            //     // currentUser = null;
            // });
    };
    LoginFactory.signup = function(data) {
        return $http.post('/api/companies', data)
        // .then(function(user){
        //     $rootScope.currentCompany=user;
        //     return user;
        // })
        //need to figure out how to set current user her
    };
    LoginFactory.logout = function () {
        console.log('logging out');
        AuthService.logout().then(function () {
            $rootScope.currentCompany=null;
           $state.go('landing');
        });
    };
    LoginFactory.login=function(loginInfo){
        return AuthService.login(loginInfo).then(function () {
            return LoginFactory.getLoggedInUser()
          })
         .then(function(user){
            $rootScope.currentCompany=user;
            $state.go('employeeslist')
         })
        .catch(function () {
              console.log('Invalid login credentials.'); //TODO: better error handling
          });
    }
          

    return LoginFactory;

});