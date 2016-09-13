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

  EmployeeFactory.fetchById = function (employeeId) {
    return $http.get('/api/employees/'+employeeId)
    .then(getData);
  };

  EmployeeFactory.update = function (employeeId,employee) {
    return $http.put('/api/employees/'+employeeId, employee)
    .then(getData);
  };

  EmployeeFactory.addNew = function (employee) {
    console.log('adding new employee')
    return $http.post('/api/employees/new', employee)
    .then(getData);
  };

  return EmployeeFactory;

});
