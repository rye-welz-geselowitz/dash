app.factory('LoginFactory', function ($http, AuthService,$state,$rootScope) {

    var LoginFactory = {};
    $rootScope.currentCompany=null;
    LoginFactory.getLoggedInUser = function () {
        return $http.get('/me')
            .then(function (res) {
                return res.data;
            })
    };
    LoginFactory.redirect=function(){
        this.getLoggedInUser()
        .catch(function(){
            $state.go('landing');
        })
    }

    LoginFactory.signup = function(data) {
        return $http.post('/api/companies', data)
    };
    LoginFactory.update = function(data,companyId) {
        return $http.put('/api/companies/'+companyId, data)
        .then(function(res){
            return res.data;
        })
    };
    LoginFactory.logout = function () {
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
            $state.go('dashboard')
         })
    }
          

    return LoginFactory;

});