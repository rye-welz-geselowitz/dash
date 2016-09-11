app.factory('LoginFactory', function ($http) {

    var LoginFactory = {};
    var currentUser = null;


    LoginFactory.getLoggedInUser = function () {
        return $http.get('/me')
            .then(function (res) {
                return res.data;
            })
            // .catch(function () {
            //     // currentUser = null;
            // });
    };


    return LoginFactory;

});