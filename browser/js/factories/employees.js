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

  EmployeeFactory.fetchById = function (employeeId) {
    return $http.get('/api/employees/'+employeeId)
    .then(getData);
  };

  EmployeeFactory.update = function (employeeId,employee) {
    return $http.put('/api/employees/'+employeeId, employee)
    .then(getData);
  };

  EmployeeFactory.delete= function (employeeId,employee) {
    return $http.delete('/api/employees/'+employeeId)
    .then(getData);
  };

  EmployeeFactory.addNew = function (employee) {
    return $http.post('/api/employees/new', employee)
    .then(getData);
  };

  return EmployeeFactory;

});
