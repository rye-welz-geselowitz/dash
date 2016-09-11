'use strict';

app.factory('EmployeeFactory', function ($http) {

  var EmployeeFactory = {};

  function getData (response) {
    return response.data;
  }

  EmployeeFactory.fetchAll = function (companyId) {
    return $http.get('/api/companies/'+companyId+'/employees')
    .then(getData);
  };

  return EmployeeFactory;

});
