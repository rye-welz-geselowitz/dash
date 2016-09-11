'use strict';

app.factory('EmployeeFactory', function ($http) {

  var EmployeeFactory = {};

  function getData (response) {
  	console.log('getting data')
  	console.log(response.data);
    return response.data;
  }

  EmployeeFactory.fetchAll = function (companyId) {
  	console.log('fetching all employees')
    return $http.get('/api/companies/'+companyId+'/employees')
    .then(getData);
  };

  return EmployeeFactory;

});
